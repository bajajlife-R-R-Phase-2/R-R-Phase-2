// ==========================================
// MOCK DATA GENERATOR & STATE MANAGER
// ==========================================

const initMockData = () => {
    localStorage.clear(); // Wiping old structure to force new Zones & Branches

    console.log("Initializing Mock Data for Indian Life Insurance Platform (Updated Zones)...");

    // 1. Zones
    const zones = ["North", "South", "West", "East", "Mumbai East", "Mumbai West"];

    // 2. Branches
    const branches = [
        { id: 'B01', name: 'South Bombay', zone: 'West' },
        { id: 'B02', name: 'Pune Central', zone: 'West' },
        { id: 'B03', name: 'Delhi NCR', zone: 'North' },
        { id: 'B04', name: 'Chandigarh', zone: 'North' },
        { id: 'B05', name: 'Bangalore East', zone: 'South' },
        { id: 'B06', name: 'Chennai Hub', zone: 'South' },
        { id: 'B07', name: 'Hyderabad Heights', zone: 'South' },
        { id: 'B08', name: 'Kolkata Metro', zone: 'East' },
        { id: 'B09', name: 'Ghatkopar', zone: 'Mumbai East' },
        { id: 'B10', name: 'Mulund', zone: 'Mumbai East' },
        { id: 'B11', name: 'Andheri', zone: 'Mumbai West' },
        { id: 'B12', name: 'Borivali', zone: 'Mumbai West' }
    ];

    // Random Data Helpers
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const randEl = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const names = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Ayaan", "Krishna", "Ishaan", "Shaurya", "Diya", "Sanya", "Neha", "Priya", "Riya", "Aarti", "Pooja", "Anjali", "Kavya", "Sneha"];
    const surnames = ["Sharma", "Verma", "Patel", "Singh", "Kumar", "Iyer", "Rao", "Das", "Reddy", "Gupta", "Mehta", "Bose", "Jain", "Nair", "Pillai"];

    // 3. Sales Managers (20)
    const sms = [];
    for (let i = 1; i <= 20; i++) {
        const branch = randEl(branches);
        sms.push({
            id: `SM${i.toString().padStart(3, '0')}`,
            name: `${randEl(names)} ${randEl(surnames)}`,
            branch_id: branch.id,
            zone: branch.zone,
            channel: Math.random() > 0.3 ? 'Agency' : 'Bancassurance'
        });
    }

    // 4. Insurance Consultants (100)
    const ics = [];
    const clubs = ["None", "Bronze", "Silver", "Gold", "MDRT", "COT", "TOT"];

    for (let i = 1; i <= 100; i++) {
        const sm = randEl(sms);
        const target = rand(1000000, 5000000); // 10L to 50L
        const nb_premium = rand(target * 0.4, target * 1.5); // 40% to 150% achievement
        const renewal_premium = rand(500000, 8000000);
        const persistency = rand(65, 98); // 65% to 98%

        // Club qualification based on NB
        let club = "None";
        if (nb_premium > 4000000) club = "MDRT";
        else if (nb_premium > 2500000) club = "Gold";
        else if (nb_premium > 1500000) club = "Silver";
        else if (nb_premium > 800000) club = "Bronze";

        ics.push({
            id: `IC${i.toString().padStart(4, '0')}`,
            name: `${randEl(names)} ${randEl(surnames)}`,
            sm_id: sm.id,
            branch_id: sm.branch_id,
            zone: sm.zone,
            channel: sm.channel,
            goalsheet_target: target,
            nb_premium: nb_premium,
            renewal_premium: renewal_premium,
            persistency: persistency,
            case_count: rand(5, 45),
            club_status: club,
            QSB_achieved: Math.random() > 0.4 // Quick Start Benefit
        });
    }

    // 5. Incentive Schemes (10)
    const schemes = [
        { id: 'SCH01', name: 'Q1 Sprint 2026', type: 'NB', budget: 5000000, utilized: 3200000, status: 'Active' },
        { id: 'SCH02', name: 'Renewal Revival', type: 'Renewal', budget: 2000000, utilized: 800000, status: 'Active' },
        { id: 'SCH03', name: 'MDRT Fast Track', type: 'Contest', budget: 10000000, utilized: 4500000, status: 'Active' },
        { id: 'SCH04', name: 'Banca Power Drive', type: 'NB', budget: 3000000, utilized: 2900000, status: 'Active' },
        { id: 'SCH05', name: 'Persistency Warriors', type: 'Persistency', budget: 1500000, utilized: 1500000, status: 'Closed' },
    ];

    // 6. Tickets/Queries (SLA simulation)
    const queries = [];
    const issues = ["Payout Mismatch", "Policy Not Reflected", "Club Status Incorrect", "Clawback Dispute", "TDS Issue"];
    const statuses = ["Open", "WIP", "Resolved", "Closed"];
    for (let i = 1; i <= 25; i++) {
        queries.push({
            id: `TKT${i.toString().padStart(4, '0')}`,
            ic_id: randEl(ics).id,
            issue_type: randEl(issues),
            scheme_tagged: randEl(schemes).id,
            status: randEl(statuses),
            created_at: new Date(Date.now() - rand(100000, 1000000000)).toISOString(),
            sla_breached: Math.random() > 0.8
        });
    }

    // Calculate Invoicing & Liabilities for Executive Dashboard
    let totalGross = 0;
    let totalNB = 0;
    let totalRenewal = 0;

    ics.forEach(ic => {
        // Basic rules simulation
        let nb_comm = ic.nb_premium * 0.15; // 15% flat for mock
        let ren_comm = ic.renewal_premium * 0.05; // 5% flat

        // Persistency Penalty / Bonus
        if (ic.persistency < 75) {
            nb_comm *= 0.5; // 50% cut if persistency < 75%
            ren_comm *= 0; // No renewal commission
        } else if (ic.persistency > 85) {
            ren_comm *= 1.2; // 20% bonus
        }

        totalNB += nb_comm;
        totalRenewal += ren_comm;
        totalGross += (nb_comm + ren_comm);
    });

    const aggregateData = {
        totalLiability: totalGross,
        paidLiability: totalGross * 0.75, // 75% paid, 25% accrued
        nbComponent: totalNB,
        renewalComponent: totalRenewal,
        tdsDeducted: totalGross * 0.10, // 10% TDS
        ptDeducted: ics.length * 200 // Rs 200 PT per IC
    };

    // 7. PSF Partners
    const psf_partners = [];
    const entityTypes = ["Broker", "Corporate Agent", "Web Aggregator"];
    for (let i = 1; i <= 15; i++) {
        const type = randEl(entityTypes);
        psf_partners.push({
            id: `PSF${i.toString().padStart(3, '0')}`,
            name: `Partner Solutions ${String.fromCharCode(64 + i)}`,
            type: type,
            status: Math.random() > 0.1 ? 'Active' : 'Dormant',
            premium: rand(5000000, 50000000), // 50L to 5Cr
            policies: rand(100, 1000),
            persistency: rand(60, 95),
            incentive_paid: rand(100000, 2000000),
            activation_rate: rand(30, 90), // % of their sub-agents active
            product_mix: { protection: rand(10, 40), savings: rand(20, 50), ulip: rand(10, 30) }
        });
    }

    // 8. In-House Teams
    const inhouse_teams = [];
    const inhouse_execs = [];
    for (let i = 1; i <= 5; i++) {
        inhouse_teams.push({
            id: `T${i.toString().padStart(2, '0')}`,
            name: `Direct Sales Team ${i}`,
            manager: `${randEl(names)} ${randEl(surnames)}`
        });

        // Exes per team
        for (let j = 1; j <= 8; j++) {
            const leads = rand(100, 500);
            const conversion = rand(5, 25); // 5% to 25%
            const policies = Math.floor(leads * (conversion / 100));
            const premium = policies * rand(20000, 100000); // 20k to 1L avg premium
            inhouse_execs.push({
                id: `IH${i}${j.toString().padStart(2, '0')}`,
                name: `${randEl(names)} ${randEl(surnames)}`,
                team_id: `T${i.toString().padStart(2, '0')}`,
                leads_assigned: leads,
                calls_made: leads * rand(2, 5),
                conversion_rate: conversion,
                policies_issued: policies,
                premium_generated: premium,
                incentive_earned: premium * 0.10 // 10% flat mock
            });
        }
    }

    // Save to LocalStorage
    localStorage.setItem('ic_platform_zones', JSON.stringify(zones));
    localStorage.setItem('ic_platform_branches', JSON.stringify(branches));
    localStorage.setItem('ic_platform_sms', JSON.stringify(sms));
    localStorage.setItem('ic_platform_ics', JSON.stringify(ics));
    localStorage.setItem('ic_platform_schemes', JSON.stringify(schemes));
    localStorage.setItem('ic_platform_queries', JSON.stringify(queries));
    localStorage.setItem('ic_platform_aggregate', JSON.stringify(aggregateData));
    localStorage.setItem('ic_platform_psf_partners', JSON.stringify(psf_partners));
    localStorage.setItem('ic_platform_inhouse_teams', JSON.stringify(inhouse_teams));
    localStorage.setItem('ic_platform_inhouse_execs', JSON.stringify(inhouse_execs));
    localStorage.setItem('ic_platform_initialized', 'true');

    console.log("Mock data generated and stored.");
};

// Auto-initialize on script load
initMockData();
