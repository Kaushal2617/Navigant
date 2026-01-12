package com.navigant.service;

import com.navigant.dto.DashboardStatsResponse;

public interface DashboardService {
    DashboardStatsResponse getDashboardStats(Integer year, Integer month, Integer day);
}
