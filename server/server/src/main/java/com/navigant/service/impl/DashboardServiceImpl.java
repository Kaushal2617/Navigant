package com.navigant.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.navigant.dto.DashboardStatsResponse;
import com.navigant.dto.DashboardStatsResponse.ChartData;
import com.navigant.model.JobApplication;
import com.navigant.model.JobPost;
import com.navigant.model.Lead;
import com.navigant.repository.JobApplicationRepository;
import com.navigant.repository.JobPostRepository;
import com.navigant.repository.LeadRepository;
import com.navigant.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final JobPostRepository jobPostRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final LeadRepository leadRepository;

    public DashboardServiceImpl(JobPostRepository jobPostRepository,
            JobApplicationRepository jobApplicationRepository,
            LeadRepository leadRepository) {
        this.jobPostRepository = jobPostRepository;
        this.jobApplicationRepository = jobApplicationRepository;
        this.leadRepository = leadRepository;
    }

    @Override
    public DashboardStatsResponse getDashboardStats(Integer year, Integer month, Integer day) {
        // 1. Basic Counts
        List<JobPost> allJobs = jobPostRepository.findAll();
        long totalJobs = allJobs.size();
        long activeJobs = allJobs.stream()
                .filter(job -> "PUBLISHED".equals(job.getStatus()))
                .count();

        List<JobApplication> allApplications = jobApplicationRepository.findAll();
        List<Lead> allLeads = leadRepository.findAll();

        // 2. Filter Lists
        if (year != null) {
            allApplications = filterApplications(allApplications, year, month, day);
            allLeads = filterLeads(allLeads, year, month, day);
        }

        long totalApplications = allApplications.size();
        long totalLeads = allLeads.size();

        // 3. Leads by Status
        Map<String, Long> leadsByStatus = allLeads.stream()
                .collect(Collectors.groupingBy(
                        lead -> lead.getStatus() != null ? lead.getStatus() : "NEW",
                        Collectors.counting()));

        // 4. Applications Chart Logic
        List<ChartData> applicationsOverTime = generateChartData(allApplications, year, month, day);

        // 5. Pending Reviews
        long pendingReviews = allApplications.stream()
                .filter(app -> "NEW".equals(app.getStatus()))
                .count();

        return new DashboardStatsResponse(
                totalJobs,
                activeJobs,
                totalApplications,
                totalLeads,
                pendingReviews,
                applicationsOverTime,
                leadsByStatus);
    }

    private List<JobApplication> filterApplications(List<JobApplication> apps, Integer year, Integer month,
            Integer day) {
        return apps.stream().filter(app -> {
            if (app.getAppliedAt() == null)
                return false;
            LocalDateTime dt = LocalDateTime.ofInstant(app.getAppliedAt(), ZoneId.systemDefault());
            boolean match = dt.getYear() == year;
            if (match && month != null)
                match = dt.getMonthValue() == month;
            if (match && day != null)
                match = dt.getDayOfMonth() == day;
            return match;
        }).collect(Collectors.toList());
    }

    private List<Lead> filterLeads(List<Lead> leads, Integer year, Integer month, Integer day) {
        return leads.stream().filter(lead -> {
            if (lead.getCreatedAt() == null)
                return false;
            LocalDateTime dt = LocalDateTime.ofInstant(lead.getCreatedAt(), ZoneId.systemDefault());
            boolean match = dt.getYear() == year;
            if (match && month != null)
                match = dt.getMonthValue() == month;
            if (match && day != null)
                match = dt.getDayOfMonth() == day;
            return match;
        }).collect(Collectors.toList());
    }

    private List<ChartData> generateChartData(List<JobApplication> apps, Integer year, Integer month, Integer day) {
        if (year == null) {
            // Default: Last 7 Days
            Map<String, Long> appsByDate = apps.stream()
                    .collect(Collectors.groupingBy(
                            app -> LocalDate.ofInstant(app.getAppliedAt(), ZoneId.systemDefault())
                                    .format(DateTimeFormatter.ISO_LOCAL_DATE),
                            Collectors.counting()));

            Map<String, Long> sortedAppsByDate = new TreeMap<>();
            LocalDate today = LocalDate.now();
            for (int i = 6; i >= 0; i--) {
                String dateKey = today.minusDays(i).format(DateTimeFormatter.ISO_LOCAL_DATE);
                sortedAppsByDate.put(dateKey, appsByDate.getOrDefault(dateKey, 0L));
            }
            return toChartDataList(sortedAppsByDate);
        } else if (month == null) {
            // Specific Year -> Monthly View (Jan-Dec)
            Map<String, Long> appsByMonth = apps.stream()
                    .collect(Collectors.groupingBy(
                            app -> LocalDate.ofInstant(app.getAppliedAt(), ZoneId.systemDefault())
                                    .format(DateTimeFormatter.ofPattern("yyyy-MM")),
                            Collectors.counting()));

            Map<String, Long> sortedAppsByMonth = new TreeMap<>();
            for (int m = 1; m <= 12; m++) {
                String key = String.format("%d-%02d", year, m);
                sortedAppsByMonth.put(key, appsByMonth.getOrDefault(key, 0L));
            }
            return toChartDataList(sortedAppsByMonth);
        } else if (day == null) {
            // Specific Month -> Daily View (1 to Last Day)
            Map<String, Long> appsByDay = apps.stream()
                    .collect(Collectors.groupingBy(
                            app -> LocalDate.ofInstant(app.getAppliedAt(), ZoneId.systemDefault())
                                    .format(DateTimeFormatter.ISO_LOCAL_DATE),
                            Collectors.counting()));

            Map<String, Long> sortedAppsByDay = new TreeMap<>();
            int daysInMonth = YearMonth.of(year, month).lengthOfMonth();
            for (int d = 1; d <= daysInMonth; d++) {
                String key = String.format("%d-%02d-%02d", year, month, d);
                sortedAppsByDay.put(key, appsByDay.getOrDefault(key, 0L));
            }
            return toChartDataList(sortedAppsByDay);
        } else {
            // Specific Day -> Hourly View (00 to 23)
            Map<String, Long> appsByHour = apps.stream()
                    .collect(Collectors.groupingBy(
                            app -> String.format("%02d:00",
                                    LocalDateTime.ofInstant(app.getAppliedAt(), ZoneId.systemDefault()).getHour()),
                            Collectors.counting()));

            Map<String, Long> sortedAppsByHour = new TreeMap<>();
            for (int h = 0; h < 24; h++) {
                String key = String.format("%02d:00", h);
                sortedAppsByHour.put(key, appsByHour.getOrDefault(key, 0L));
            }
            return toChartDataList(sortedAppsByHour);
        }
    }

    private List<ChartData> toChartDataList(Map<String, Long> map) {
        return map.entrySet().stream()
                .map(entry -> new ChartData(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }
}
