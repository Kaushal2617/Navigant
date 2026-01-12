package com.navigant.dto;

import java.util.List;
import java.util.Map;

public record DashboardStatsResponse(
        long totalJobs,
        long activeJobs,
        long totalApplications,
        long totalLeads,
        long pendingReviews,
        List<ChartData> applicationsOverTime,
        Map<String, Long> leadsByStatus) {
    public record ChartData(String date, long count) {
    }
}
