package com.mechayaki.backend.stalls.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mechayaki.backend.stalls.model.Stall;

public interface StallRepository extends JpaRepository<Stall, Long> {}
