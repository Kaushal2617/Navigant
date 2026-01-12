package com.navigant.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.navigant.dto.DashboardStatsResponse;
import com.navigant.service.DashboardService;

@RestController
@RequestMapping("/api/v1/admin/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    public DashboardStatsResponse getStats(
            @org.springframework.web.bind.annotation.RequestParam(required = false) Integer year,
            @org.springframework.web.bind.annotation.RequestParam(required = false) Integer month,
            @org.springframework.web.bind.annotation.RequestParam(required = false) Integer day) {
        return dashboardService.getDashboardStats(year, month, day);
    }
}
