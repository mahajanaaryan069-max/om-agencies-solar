/**
 * OM AGENCIES — CHHATRAPATI SAMBHAJINAGAR
 * Master Application Architecture & Client-Side Interactive Engine
 * 
 * Upgraded Features:
 * - Hash Router (#home, #services, #contact, #about, #proof, #legal, #thank-you, #404)
 * - Dynamic Bilingual Localization (English | मराठी)
 * - 4-Mode Subsidy & EMI Calculator with Synchronized Direct Number Input & Visual Split Bar
 * - Instant Printable / PDF Formal Proposal Generator with GSTIN & Showroom Branding
 * - 2-Step Solar & Water Heater Recommendation Diagnostic Wizard
 * - 12 Verified Supreme Solar Water Heater Models with 1-Tap WhatsApp Inquiries
 * - Same-Day Solar Geyser Repair & Descaling Dispatcher
 * - MSEDCL Sambhajinagar Sub-Division Selector & Bill Photo Attachment Trigger
 * - 4-Point PM Surya Ghar Document Readiness Interactive Checker
 * - Web Share API & PWA Service Worker Integration
 */

(function () {
  'use strict';

  // Global State
  const state = {
    lang: 'en',
    route: 'home',
    calc: {
      mode: 'residential',
      billAmount: 3200,
      kw: 3,
      subsidy: 78000,
      grossCost: 195000,
      netCost: 117000,
      annualSavings: 42000,
      lifetimeSavings: 1050000,
      emi: 2260,
      enableLoan: true,
      roofArea: 285
    },
    wizard: {
      water: 'borewell',
      bathrooms: '3+'
    },
    catalogFilter: 'all',
    proofFilter: 'all',
    repairService: 'Hard-Water Tank Descaling',
    checklist: {
      bill: false,
      aadhaar: false,
      roof: false,
      bank: false
    },
    attachedBillName: null,
    lastSubmission: null
  };

  // 12 Verified Supreme Solar Water Heater Models
  const catalogData = [
    {
      id: 'spgl-110',
      name: 'Supreme SPGL 110 LPD',
      marathiName: 'सुप्रीम एसपीजीएल ११० एलपीडी',
      category: 'gl',
      familySize: '2-4',
      type: '8-Tube Glass-Lined',
      marathiType: '८-ट्यूब ग्लास-लाइंड',
      price: 15900,
      isQuote: false,
      badge: 'Hard-Water Proof',
      tubes: '8 Evacuated Ceramic Tubes',
      tank: 'Glass-Enamel Coated Inner Tank',
      warranty: '5 Years Manufacturer Guarantee',
      bestFor: '2 to 3 Person Families (Borewell Water)'
    },
    {
      id: 'spgl-165',
      name: 'Supreme SPGL 165 LPD',
      marathiName: 'सुप्रीम एसपीजीएल १६५ एलपीडी',
      category: 'gl',
      familySize: '4-6',
      type: '12-Tube Glass-Lined',
      marathiType: '१२-ट्यूब ग्लास-लाइंड',
      price: 20900,
      isQuote: false,
      badge: 'Best Seller HUDCO',
      tubes: '12 Evacuated High-Absorption Tubes',
      tank: 'Ceramic Glass-Lined Anti-Corrosion',
      warranty: '5 Years Manufacturer Guarantee',
      bestFor: '4 to 5 Members with High Hardness Water'
    },
    {
      id: 'glpc-165',
      name: 'Supreme 165 GL PC',
      marathiName: 'सुप्रीम १६५ जीएल पीसी',
      category: 'gl',
      familySize: '4-6',
      type: '16-Tube Pressurized Glass-Lined',
      marathiType: '१६-ट्यूब प्रेशराइज्ड ग्लास-लाइंड',
      price: 0,
      isQuote: true,
      badge: 'Pressurized Spec',
      tubes: '16 High-Strength Tubes',
      tank: 'Pressurized Glass-Coated Inner Tank',
      warranty: '5 Years Extended Guarantee',
      bestFor: 'High-Pressure Booster Pump Systems'
    },
    {
      id: 'glpc-220',
      name: 'Supreme 220 GL PC',
      marathiName: 'सुप्रीम २२० जीएल पीसी',
      category: 'gl',
      familySize: '6+',
      type: '21-Tube Pressurized Glass-Lined',
      marathiType: '२१-ट्यूब प्रेशराइज्ड ग्लास-लाइंड',
      price: 27900,
      isQuote: false,
      badge: 'Heavy Pressurized',
      tubes: '21 Evacuated Solar Tubes',
      tank: 'Double Coated Ceramic Glass Tank',
      warranty: '7 Years Tank Guarantee',
      bestFor: 'Bungalows with Multi-Shower Bathrooms'
    },
    {
      id: 'glpc-270',
      name: 'Supreme 270 GL PC',
      marathiName: 'सुप्रीम २७० जीएल पीसी',
      category: 'gl',
      familySize: '6+',
      type: '26-Tube Pressurized Glass-Lined',
      marathiType: '२६-ट्यूब प्रेशराइज्ड ग्लास-लाइंड',
      price: 29900,
      isQuote: false,
      badge: 'Heavy Duty',
      tubes: '26 Tubes High-Heat Array',
      tank: 'Industrial Polymer Glass Lining',
      warranty: '10 Years Structural Guarantee',
      bestFor: 'Joint Families, Row Houses & Clinics'
    },
    {
      id: 'glpc-300',
      name: 'Supreme 300 GL PC',
      marathiName: 'सुप्रीम ३०० जीएल पीसी',
      category: 'gl',
      familySize: '6+',
      type: '30-Tube Heavy Pressurized',
      marathiType: '३०-ट्यूब हेवी प्रेशराइज्ड',
      price: 36500,
      isQuote: false,
      badge: '15-Yr Tank Guarantee',
      tubes: '30 Tubes Maximum Thermal Array',
      tank: 'Robotic Automated Glass-Enamel Liner',
      warranty: '15 Years Extended Tank Guarantee',
      bestFor: 'Luxury Villas & Multi-Storey Residences'
    },
    {
      id: 'sspc-100',
      name: 'Supreme SSPC 100 LPD',
      marathiName: 'सुप्रीम एसएसपीसी १०० एलपीडी',
      category: 'ss',
      familySize: '2-4',
      type: 'ETC Stainless Steel',
      marathiType: 'ईटीसी स्टेनलेस स्टील',
      price: 15600,
      isQuote: false,
      badge: 'Budget Friendly',
      tubes: '10 Evacuated Vacuum Tubes',
      tank: 'Food-Grade Stainless Steel 304',
      warranty: '5 Years Guarantee',
      bestFor: 'Municipal Corporation (Soft) Water'
    },
    {
      id: 'sspc-150',
      name: 'Supreme SSPC 150 LPD',
      marathiName: 'सुप्रीम एसएसपीसी १५० एलपीडी',
      category: 'ss',
      familySize: '4-6',
      type: '15-Tube ETC Stainless Steel',
      marathiType: '१५-ट्यूब ईटीसी स्टेनलेस स्टील',
      price: 18900,
      isQuote: false,
      badge: 'Popular Choice',
      tubes: '15 Evacuated Tubes',
      tank: 'Grade 304 Stainless Steel Tank',
      warranty: '5 Years Guarantee',
      bestFor: '3 to 5 Member Families in Sambhajinagar'
    },
    {
      id: 'sspc-200',
      name: 'Supreme SSPC 200 LPD',
      marathiName: 'सुप्रीम एसएसपीसी २०० एलपीडी',
      category: 'ss',
      familySize: '4-6',
      type: '20-Tube ETC Stainless Steel',
      marathiType: '२०-ट्यूब ईटीसी स्टेनलेस स्टील',
      price: 24900,
      isQuote: false,
      badge: 'High Value',
      tubes: '20 Evacuated Tubes Array',
      tank: 'High-Density Polyurethane Insulated',
      warranty: '5 Years Tank Guarantee',
      bestFor: '5 to 6 Member Households'
    },
    {
      id: 'sspc-250',
      name: 'Supreme SSPC 250 LPD',
      marathiName: 'सुप्रीम एसएसपीसी २५० एलपीडी',
      category: 'ss',
      familySize: '6+',
      type: '24-Tube ETC Stainless Steel',
      marathiType: '२४-ट्यूब ईटीसी स्टेनलेस स्टील',
      price: 29600,
      isQuote: false,
      badge: 'High Capacity',
      tubes: '24 Tubes Configuration',
      tank: 'SUS304-2B SS Inner Tank',
      warranty: '5 Years Guarantee',
      bestFor: 'Multi-Floor Homes & Apartments'
    },
    {
      id: 'sspc-300',
      name: 'Supreme SSPC 300 LPD',
      marathiName: 'सुप्रीम एसएसपीसी ३०० एलपीडी',
      category: 'ss',
      familySize: '6+',
      type: '30-Tube ETC Stainless Steel',
      marathiType: '३०-ट्यूब ईटीसी स्टेनलेस स्टील',
      price: 35900,
      isQuote: false,
      badge: 'Maximum Yield',
      tubes: '30 Tubes Standard Array',
      tank: 'Ultra Heavy SS Inner Tank',
      warranty: '7 Years Tank Guarantee',
      bestFor: 'Small Hostels, Clinics & Joint Families'
    },
    {
      id: 'sspc-500',
      name: 'Supreme SSPC 500 LPD',
      marathiName: 'सुप्रीम एसएसपीसी ५०० एलपीडी',
      category: 'ss',
      familySize: '6+',
      type: '50-Tube Commercial ETC',
      marathiType: '५०-ट्यूब कमर्शियल ईटीसी',
      price: 55900,
      isQuote: false,
      badge: 'Commercial Grade',
      tubes: '50 High Performance Tubes',
      tank: 'Heavy Duty Thermal Insulated SS Tank',
      warranty: '7 Years Commercial Guarantee',
      bestFor: 'Hotels, Hospitals & Hostels in MIDC / CIDCO'
    }
  ];

  // Verified Local Case Studies
  const caseStudiesData = [
    {
      locality: 'N-11 HUDCO',
      title: '3 kW Residential Rooftop (Tata Power DCR)',
      desc: 'Homeowner experienced rising summer MSEDCL bills touching ₹3,800/mo. Installed 3 kW Mono PERC array with PM Surya Ghar ₹78,000 subsidy.',
      beforeBill: '₹3,800',
      afterBill: '₹180 (Fixed)',
      investment: '₹1,17,000 Net',
      generation: '14.5 Units / day'
    },
    {
      locality: 'CIDCO',
      title: 'Supreme SPGL 220 LPD Glass-Lined Solar Geyser',
      desc: 'High borewell water TDS (1,150 ppm) in CIDCO was corroding standard electric geysers every 18 months. Replaced with 21-tube pressurized glass-lined unit.',
      beforeBill: '₹1,650/mo',
      afterBill: '₹0 / Free',
      investment: '₹27,900 Showroom Rate',
      generation: 'Zero Scaling in 3 Yrs'
    },
    {
      locality: 'Ulkanagari',
      title: '5 kW On-Grid System (Waaree Bi-Facial)',
      desc: 'Independent double-storey bungalow with multiple ACs and electric vehicles. Elevated 10-ft structure preserving roof garden space.',
      beforeBill: '₹6,400/mo',
      afterBill: '₹240/mo',
      investment: '₹2,47,000 Net',
      generation: '24.2 Units / day'
    },
    {
      locality: 'MIDC Waluj',
      title: '15 kW Commercial Rooftop + 500 LPD SSPC',
      desc: 'Precision manufacturing unit offset daytime machinery load and staff cafeteria water heating. Claimed 40% accelerated tax depreciation.',
      beforeBill: '₹24,500/mo',
      afterBill: '₹11,200/mo',
      investment: 'Commercial EPC',
      generation: '68 Units / day'
    }
  ];

  // Bilingual Translation Dictionary
  const translations = {
    en: {
      siteTitle: 'Om Agencies — Rooftop Solar EPC & Supreme Solar Water Heaters',
      navHome: 'Home',
      navServices: 'Services & Pricing',
      navContact: 'Book Survey',
      navAbout: 'About',
      navProof: 'Proof & Reviews',
      btnBookFree: 'Book Free Roof Survey',
      heroTag: 'Chhatrapati Sambhajinagar\'s #1 Solar Authority',
      heroH1: 'Stop Paying MSEDCL Bills. Switch to <span>16-Year Trusted</span> Rooftop Solar.',
      heroSub: 'Authorized EPC contractor for Tata Power Solar, Waaree, and Supreme Solar Water Heaters. Claim up to ₹78,000 official PM Surya Ghar subsidy with zero paperwork hassle.',
      badgeReviewsG: '4.9★ Google (239+ Reviews)',
      badgeReviewsJ: '4.8★ Justdial (398 Ratings)',
      badgeLegacy: 'Est. 2010 • 16 Yrs',
      calcTitle: 'PM Surya Ghar Subsidy & ROI Calculator',
      calcSub: 'Calculate your exact government subsidy, monthly savings, and loan EMI tailored to MSEDCL tariff slabs.',
      modeRes: 'Residential (MSEDCL LT-I)',
      modeSmart: 'SMART (<100 Units)',
      modeRwa: 'Housing Society / RWA',
      modeComm: 'Commercial / Industrial',
      billLabel: 'Average Monthly Electricity Bill:',
      recCapacity: 'Recommended System Capacity:',
      reqArea: 'Shadow-Free Roof Area Required:',
      grossCost: 'Estimated Benchmark Gross Cost:',
      govtSubsidy: 'PM Surya Ghar Direct Subsidy (DBT):',
      netCost: 'Net Out-of-Pocket Cost:',
      annualSav: 'Estimated Annual Bill Savings:',
      lifetimeSav: 'Estimated 25-Year Lifetime Savings:',
      emiText: 'Collateral-Free Bank Solar Loan EMI (~6.0% p.a., 5 Yrs):',
      btnClaimSubsidy: 'Claim Subsidy & Book Free Inspection',
      compareTitle: 'Why Sambhajinagar Homeowners Choose Om Agencies vs. Out-of-Town Portals',
      servicesTitle: 'Solar Water Heater & EPC Catalog',
      servicesSub: 'Transparent factory-direct rates with verified N-11 HUDCO showroom warranty and personal after-sales care.',
      filterAll: 'All Products',
      filterGl: 'Glass-Lined Hard-Water',
      filterSs: 'ETC Stainless Steel',
      filterSmall: '2–4 Members',
      filterMedium: '4–6 Members',
      filterLarge: '6+ Members',
      btnWhatsAppEnquire: 'Order / Enquire on WhatsApp',
      proofTitle: 'Verified Social Proof & 11+ Year Retention',
      proofSub: 'Real Sambhajinagar families who eliminated electricity bills with Om Agencies.',
      checkerTitle: '4-Point PM Surya Ghar Readiness Self-Check',
      checkerSub: 'Verify if your documents are ready for immediate MSEDCL net-metering and direct DBT subsidy transfer.',
      doc1: 'Current MSEDCL Electricity Bill (Consumer Number matches Aadhaar)',
      doc2: 'Property Tax / Index-II Proof (Terrace ownership proof)',
      doc3: 'Aadhaar Card linked with active mobile number (for OTP validation)',
      doc4: 'Cancelled Bank Cheque / Passbook (for direct ₹78,000 credit)',
      contactTitle: 'Visit Our N-11 HUDCO Showroom or Book an Inspection',
      contactSub: 'Speak directly with D. B. Magar (Proprietor) — no call centers, no middlemen.',
      footerDesc: 'Chhatrapati Sambhajinagar\'s leading Rooftop Solar EPC contractor and authorized Supreme Solar Water Heater dealer since 2010. Grounded local engineering, transparent pricing, and 630+ verified 5-star reviews.'
    },
    mr: {
      siteTitle: 'ओम एजन्सीज — रूफटॉप सोलर ईपीसी आणि सुप्रीम सोलर वॉटर हीटर्स',
      navHome: 'मुख्यपृष्ठ',
      navServices: 'सेवा आणि दरपत्रक',
      navContact: 'सर्व्हे बुक करा',
      navAbout: 'आमच्याबद्दल',
      navProof: 'विश्वास व ग्राहक',
      btnBookFree: 'मोफत छताचे सर्वेक्षण बुक करा',
      heroTag: 'छत्रपती संभाजीनगरमधील #१ विश्वासू सोलर दालन',
      heroH1: 'महावितरणचे वीज बिल थांबवा. <span>१६ वर्षांच्या अनुभवासह</span> सोलर बसवा.',
      heroSub: 'टाटा पॉवर सोलर, वारी आणि सुप्रीम सोलर वॉटर हीटर्सचे अधिकृत वितरक. पीएम सूर्य घर योजनेअंतर्गत ₹७८,००० पर्यंत थेट सबसिडी मिळवा, सर्व कागदपत्रांची जबाबदारी आमची.',
      badgeReviewsG: '४.९★ गुगल (२३९+ रिव्ह्यूज)',
      badgeReviewsJ: '४.८★ जस्टडायल (३९८ रेटिंग्ज)',
      badgeLegacy: 'स्थापना २०१० • १६ वर्षे',
      calcTitle: 'पीएम सूर्य घर सबसिडी व बचत कॅल्क्युलेटर',
      calcSub: 'तुमचे महावितरण बिल, शासकीय सबसिडी, वार्षिक बचत आणि सुलभ बँक हप्ता तपासा.',
      modeRes: 'घरगुती (एलटी-१)',
      modeSmart: 'स्मार्ट (<१०० युनिट्स)',
      modeRwa: 'गृहनिर्माण संस्था / सोसायटी',
      modeComm: 'व्यावसायिक / कारखाने',
      billLabel: 'सरासरी मासिक वीज बिल:',
      recCapacity: 'शिफारस केलेली सोलर क्षमता:',
      reqArea: 'आवश्यक सावलीमुक्त छताची जागा:',
      grossCost: 'अंदाजे बेंचमार्क एकूण किंमत:',
      govtSubsidy: 'पीएम सूर्य घर थेट शासकीय सबसिडी:',
      netCost: 'तुमची प्रत्यक्ष गुंतवणूक:',
      annualSav: 'अंदाजे वार्षिक वीज बचत:',
      lifetimeSav: '२५ वर्षांची अंदाजे एकूण बचत:',
      emiText: 'सुलभ बँक सौर कर्ज हप्ता (६.०% प्रति वर्ष व्याजदराने):',
      btnClaimSubsidy: 'सबसिडी मिळवा व मोफत पाहणी बुक करा',
      compareTitle: 'संभाजीनगरकर नागरिक ओम एजन्सीजलाच का पसंती देतात?',
      servicesTitle: 'सोलर वॉटर हीटर आणि सोलर सिस्टीम दरपत्रक',
      servicesSub: 'एन-११ हुडको शोरूमची थेट वॉरंटी आणि स्वतः मगर सरांची खात्रीशीर विक्रीनंतरची सेवा.',
      filterAll: 'सर्व उत्पादने',
      filterGl: 'ग्लास-लाइंड (खारट पाण्यासाठी)',
      filterSs: 'स्टेनलेस स्टील (ईटीसी)',
      filterSmall: '२–४ सदस्य',
      filterMedium: '४–६ सदस्य',
      filterLarge: '६+ सदस्य',
      btnWhatsAppEnquire: 'व्हॉट्सअ‍ॅपवर मागणी / चौकशी करा',
      proofTitle: 'सत्य ग्राहक अनुभव आणि ११+ वर्षांचा विश्वास',
      proofSub: 'संभाजीनगरमधील कुटुंबांनी शून्य केले त्यांचे वीज बिल.',
      checkerTitle: 'पीएम सूर्य घर योजना - ४ आवश्यक कागदपत्रे तपासणी',
      checkerSub: 'महावितरण नेट-मीटरिंग व ₹७८,००० थेट खात्यात सबसिडी जमा होण्यासाठी तुमची कागदपत्रे तयार आहेत का ते तपासा.',
      doc1: 'चालू महावितरण वीज बिल (ग्राहकाचे नाव आधारशी जुळणारे)',
      doc2: 'घरपट्टी / इंडेक्स-२ उतारा (छताच्या मालकीचा पुरावा)',
      doc3: 'मोबाईलशी लिंक असलेले आधार कार्ड (ओटीपी पडताळणीसाठी)',
      doc4: 'रद्द केलेला चेक किंवा बँक पासबुक (थेट ₹७८,००० जमा होण्यासाठी)',
      contactTitle: 'एन-११ हुडको शोरूमला भेट द्या किंवा पाहणी बुक करा',
      contactSub: 'थेट डी. बी. मगर सरांशी (प्रोप्रायटर) संपर्क साधा — कोणतीही मध्यस्थी नाही.',
      footerDesc: 'छत्रपती संभाजीनगरमधील अग्रगण्य रूफटॉप सोलर ईपीसी कंत्राटदार आणि सुप्रीम सोलरचे अधिकृत वितरक (२०१० पासून). प्रामाणिक दर, स्थानिक तंत्रज्ञ आणि ६३०+ ५-स्टार ग्राहकांचे समाधान.'
    }
  };

  // Helper: Format INR
  function formatINR(val) {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  }

  // Routing Engine
  function handleRoute() {
    const rawHash = window.location.hash.slice(1);
    const validRoutes = ['home', 'services', 'contact', 'about', 'proof', 'legal', 'thank-you', '404'];
    let target = rawHash.split('?')[0] || 'home';

    if (!validRoutes.includes(target)) {
      target = '404';
    }

    state.route = target;

    document.querySelectorAll('.app-view').forEach(view => {
      view.classList.remove('active-view');
    });

    const activeEl = document.getElementById('view-' + target);
    if (activeEl) {
      activeEl.classList.add('active-view');
    }

    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === '#' + target || (target === 'home' && href === '#')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    const drawer = document.getElementById('mobileDrawer');
    if (drawer) drawer.classList.remove('open');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Calculator Engine with Synchronized Direct Input
  function recalculate() {
    const mode = state.calc.mode;
    let bill = state.calc.billAmount;
    let kw = 3;
    let subsidy = 78000;
    const benchmarkPerKw = 65000;

    if (mode === 'residential') {
      if (bill <= 1600) {
        kw = 1;
        subsidy = 30000;
      } else if (bill <= 2800) {
        kw = 2;
        subsidy = 60000;
      } else if (bill <= 4200) {
        kw = 3;
        subsidy = 78000;
      } else if (bill <= 5600) {
        kw = 4;
        subsidy = 78000;
      } else if (bill <= 7000) {
        kw = 5;
        subsidy = 78000;
      } else {
        kw = Math.min(10, Math.ceil(bill / 1400));
        subsidy = 78000;
      }
    } else if (mode === 'smart') {
      kw = 1;
      subsidy = 30000;
      bill = Math.min(bill, 1200);
    } else if (mode === 'rwa') {
      kw = Math.max(5, Math.ceil(bill / 1200));
      subsidy = kw * 18000;
    } else if (mode === 'commercial') {
      kw = Math.max(5, Math.ceil(bill / 1600));
      subsidy = 0;
    }

    const grossCost = kw * benchmarkPerKw;
    const netCost = Math.max(0, grossCost - subsidy);
    const roofArea = kw * 95;
    const annualSavings = kw * 1400 * 8.2;
    const lifetimeSavings = annualSavings * 25;
    
    // EMI calculation: 5 years (60 months) @ 6% p.a.
    const principal = netCost;
    const r = (0.06) / 12;
    const n = 60;
    const emi = principal > 0 ? (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : 0;

    state.calc.kw = kw;
    state.calc.subsidy = subsidy;
    state.calc.grossCost = grossCost;
    state.calc.netCost = netCost;
    state.calc.roofArea = roofArea;
    state.calc.annualSavings = annualSavings;
    state.calc.lifetimeSavings = lifetimeSavings;
    state.calc.emi = emi;

    // Synchronize UI inputs
    const slider = document.getElementById('calcBillSlider');
    if (slider && parseInt(slider.value, 10) !== bill) {
      slider.value = bill;
    }

    const numInput = document.getElementById('calcBillNumberInput');
    if (numInput && parseInt(numInput.value, 10) !== bill) {
      numInput.value = bill;
    }

    const kwDisplay = document.getElementById('calcKwDisplay');
    if (kwDisplay) kwDisplay.textContent = kw + ' kW System';

    const roofDisplay = document.getElementById('calcRoofDisplay');
    if (roofDisplay) roofDisplay.textContent = roofArea + ' sq.ft.';

    const grossDisplay = document.getElementById('calcGrossDisplay');
    if (grossDisplay) grossDisplay.textContent = formatINR(grossCost);

    const subsidyDisplay = document.getElementById('calcSubsidyDisplay');
    if (subsidyDisplay) subsidyDisplay.textContent = '-' + formatINR(subsidy);

    const netDisplay = document.getElementById('calcNetDisplay');
    if (netDisplay) netDisplay.textContent = formatINR(netCost);

    const annualSavDisplay = document.getElementById('calcAnnualSavDisplay');
    if (annualSavDisplay) annualSavDisplay.textContent = formatINR(annualSavings) + ' / year';

    const lifetimeSavDisplay = document.getElementById('calcLifetimeSavDisplay');
    if (lifetimeSavDisplay) lifetimeSavDisplay.textContent = formatINR(lifetimeSavings) + ' over 25 Yrs';

    const emiDisplay = document.getElementById('calcEmiDisplay');
    if (emiDisplay) emiDisplay.textContent = formatINR(emi) + ' / mo';

    // Visual Split Bar
    const splitSubsidyEl = document.getElementById('splitSubsidyBar');
    const splitNetEl = document.getElementById('splitNetBar');
    const splitSubsidyLegend = document.getElementById('splitSubsidyLegend');
    const splitNetLegend = document.getElementById('splitNetLegend');

    if (splitSubsidyEl && splitNetEl && grossCost > 0) {
      const subsidyPct = Math.min(100, Math.round((subsidy / grossCost) * 100));
      const netPct = 100 - subsidyPct;
      splitSubsidyEl.style.width = subsidyPct + '%';
      splitNetEl.style.width = netPct + '%';

      if (splitSubsidyLegend) splitSubsidyLegend.textContent = `Govt Subsidy: ${subsidyPct}% (${formatINR(subsidy)})`;
      if (splitNetLegend) splitNetLegend.textContent = `Your Investment: ${netPct}% (${formatINR(netCost)})`;
    }
  }

  // 2-Step Recommendation Diagnostic Wizard Engine
  function updateWizardRecommendation() {
    const water = state.wizard.water;
    const baths = state.wizard.bathrooms;

    const titleEl = document.getElementById('wizardRecTitle');
    const descEl = document.getElementById('wizardRecDesc');
    const badgeEl = document.getElementById('wizardRecBadge');
    const waBtn = document.getElementById('wizardWaBtn');

    let recModel = 'Supreme SPGL 220 LPD Glass-Lined';
    let recPrice = '₹27,900';
    let recBadge = 'Hard-Water Pressurized Spec';
    let recDesc = 'Borewell water in CIDCO/HUDCO carries >1,000 ppm TDS. Standard stainless steel pits within 2 years. We recommend Supreme Glass-Lined Ceramic Enamel for 15+ years of corrosion protection with booster pump tolerance.';

    if (water === 'municipal') {
      if (baths === '1-2') {
        recModel = 'Supreme SSPC 150 LPD (15-Tube ETC)';
        recPrice = '₹18,900';
        recBadge = 'Optimal Budget Choice';
        recDesc = 'For soft municipal water and 1–2 bathrooms, the Grade 304 food-grade stainless steel unit provides 100% rust-free hot water at minimal upfront cost.';
      } else {
        recModel = 'Supreme SSPC 250 LPD (24-Tube ETC)';
        recPrice = '₹29,600';
        recBadge = 'High Capacity Family';
        recDesc = 'Sufficient capacity for multi-bathroom morning routines with high-density polyurethane insulation keeping water boiling hot till night.';
      }
    } else {
      // Borewell Hard Water
      if (baths === '1-2') {
        recModel = 'Supreme SPGL 165 LPD Glass-Lined';
        recPrice = '₹20,900';
        recBadge = 'Best Seller HUDCO';
        recDesc = 'Specially coated with automated ceramic glass lining to handle scale and chemical deposits from hard borewell water in N-11 HUDCO & Beed Bypass.';
      } else {
        recModel = 'Supreme 220 GL PC (21-Tube Pressurized)';
        recPrice = '₹27,900';
        recBadge = 'Heavy Pressurized Hard-Water';
        recDesc = 'Engineered for high-pressure booster pumps and high TDS borewell water. Double-coated ceramic lining backed by 7-year tank guarantee.';
      }
    }

    if (titleEl) titleEl.textContent = recModel + ' (' + recPrice + ')';
    if (descEl) descEl.textContent = recDesc;
    if (badgeEl) badgeEl.textContent = recBadge;

    if (waBtn) {
      const msg = `Hello Om Agencies, the recommendation wizard suggested ${recModel} (${recPrice}) for my home in Sambhajinagar. Please provide site survey and availability.`;
      waBtn.href = `https://wa.me/919423393107?text=${encodeURIComponent(msg)}`;
    }
  }

  // Formal Printable / PDF Proposal Generator
  function openProposalModal() {
    const modal = document.getElementById('proposalModal');
    if (!modal) return;

    const calc = state.calc;
    const nameInput = document.getElementById('heroName');
    const clientName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : 'Valued Homeowner';
    const localitySelect = document.getElementById('heroLocality');
    const locality = localitySelect ? localitySelect.value : 'Chhatrapati Sambhajinagar';

    const propClient = document.getElementById('propClientName');
    if (propClient) propClient.textContent = clientName + ' (' + locality + ')';

    const propDate = document.getElementById('propDate');
    if (propDate) propDate.textContent = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

    const propKw = document.getElementById('propKw');
    if (propKw) propKw.textContent = calc.kw + ' kW On-Grid Solar Plant';

    const propGross = document.getElementById('propGross');
    if (propGross) propGross.textContent = formatINR(calc.grossCost);

    const propSubsidy = document.getElementById('propSubsidy');
    if (propSubsidy) propSubsidy.textContent = '-' + formatINR(calc.subsidy);

    const propNet = document.getElementById('propNet');
    if (propNet) propNet.textContent = formatINR(calc.netCost);

    const propAnnual = document.getElementById('propAnnual');
    if (propAnnual) propAnnual.textContent = formatINR(calc.annualSavings) + ' / year';

    const propEmi = document.getElementById('propEmi');
    if (propEmi) propEmi.textContent = formatINR(calc.emi) + ' / month (approx)';

    modal.classList.add('open');
  }

  function closeProposalModal() {
    const modal = document.getElementById('proposalModal');
    if (modal) modal.classList.remove('open');
  }

  // Web Share API Integration
  function shareQuote() {
    const calc = state.calc;
    const shareText = `☀️ Official Solar Estimate from Om Agencies (HUDCO, Sambhajinagar):\n\n` +
      `⚡ Capacity: ${calc.kw} kW Rooftop Solar Plant\n` +
      `💰 Gross Benchmark: ${formatINR(calc.grossCost)}\n` +
      `🏛️ PM Surya Ghar Subsidy: -${formatINR(calc.subsidy)}\n` +
      `💵 Net Investment: ${formatINR(calc.netCost)}\n` +
      `📉 Annual Savings: ${formatINR(calc.annualSavings)}/yr\n` +
      `🏦 Bank Solar EMI: ${formatINR(calc.emi)}/mo\n\n` +
      `Verified Showroom: Near D-Mart, N-11 HUDCO. Contact D. B. Magar at +91 94233 93107`;

    if (navigator.share) {
      navigator.share({
        title: 'Om Agencies Solar Estimate',
        text: shareText,
        url: window.location.href
      }).catch(() => {});
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
    }
  }

  // Catalog Render
  function renderCatalog() {
    const grid = document.getElementById('catalogGrid');
    if (!grid) return;

    const filter = state.catalogFilter;
    const lang = state.lang;

    const filtered = catalogData.filter(item => {
      if (filter === 'all') return true;
      if (filter === 'gl') return item.category === 'gl';
      if (filter === 'ss') return item.category === 'ss';
      if (filter === '2-4') return item.familySize === '2-4';
      if (filter === '4-6') return item.familySize === '4-6';
      if (filter === '6+') return item.familySize === '6+';
      return true;
    });

    grid.innerHTML = filtered.map(item => {
      const displayName = lang === 'mr' ? item.marathiName : item.name;
      const displayType = lang === 'mr' ? item.marathiType : item.type;
      const priceText = item.isQuote ? (lang === 'mr' ? 'मागणीनुसार दर' : 'Quote on Request') : formatINR(item.price);
      const encodedMsg = encodeURIComponent(
        `Hello Om Agencies, I want to inquire about the ${item.name} (${priceText}). Please send catalog sheet and installation timeline for Sambhajinagar.`
      );
      const waUrl = `https://wa.me/919423393107?text=${encodedMsg}`;

      return `
        <div class="product-card" data-category="${item.category}" data-size="${item.familySize}">
          <span class="product-badge ${item.badge.includes('Guarantee') || item.badge.includes('Seller') ? 'gold' : ''}">${item.badge}</span>
          <div>
            <div class="product-type">${displayType}</div>
            <h3 class="product-title">${displayName}</h3>
            <div class="product-price-row">
              <span class="product-price">${priceText}</span>
              ${!item.isQuote ? '<span class="product-unit">/ unit (showroom rate)</span>' : ''}
            </div>
            <ul class="product-specs-list">
              <li class="product-spec-item">
                <span class="spec-key">Tubes/Array:</span>
                <span class="spec-val">${item.tubes}</span>
              </li>
              <li class="product-spec-item">
                <span class="spec-key">Inner Tank:</span>
                <span class="spec-val">${item.tank}</span>
              </li>
              <li class="product-spec-item">
                <span class="spec-key">Warranty:</span>
                <span class="spec-val">${item.warranty}</span>
              </li>
              <li class="product-spec-item">
                <span class="spec-key">Ideal For:</span>
                <span class="spec-val">${item.bestFor}</span>
              </li>
            </ul>
          </div>
          <div style="margin-top: 1rem;">
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-block">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              <span>${lang === 'mr' ? 'व्हॉट्सअ‍ॅपवर मागणी / चौकशी करा' : 'Order / Enquire on WhatsApp'}</span>
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Case Studies with Neighborhood Filter
  function renderCaseStudies() {
    const wrap = document.getElementById('caseStudiesGrid');
    if (!wrap) return;

    const filter = state.proofFilter;
    const filtered = caseStudiesData.filter(item => {
      if (filter === 'all') return true;
      return item.locality === filter;
    });

    wrap.innerHTML = filtered.map(item => `
      <div class="case-card">
        <div>
          <span class="case-location-badge">📍 ${item.locality} Parisar</span>
          <h4 class="case-title">${item.title}</h4>
          <p style="font-size: 0.875rem; color: var(--text-body);">${item.desc}</p>
        </div>
        <div class="case-metric-box">
          <div class="case-metric">
            <h5>Monthly Bill Before</h5>
            <p style="color: #DC2626;">${item.beforeBill}</p>
          </div>
          <div class="case-metric">
            <h5>Current Bill / Benefit</h5>
            <p>${item.afterBill}</p>
          </div>
        </div>
        <p style="font-size: 0.8125rem; color: var(--text-muted);">
          <strong>Investment:</strong> ${item.investment} | <strong>Generation / Result:</strong> ${item.generation}
        </p>
      </div>
    `).join('');
  }

  // Document Readiness Checker Engine
  function updateChecklist() {
    const checks = state.checklist;
    const total = 4;
    const count = Object.values(checks).filter(Boolean).length;
    const pct = Math.round((count / total) * 100);

    const barEl = document.getElementById('checkerProgressBar');
    if (barEl) barEl.style.width = pct + '%';

    const countEl = document.getElementById('checkerCountDisplay');
    if (countEl) countEl.textContent = `${count} of ${total} Ready (${pct}%)`;

    const statusBanner = document.getElementById('checkerStatusBanner');
    if (statusBanner) {
      if (pct === 100) {
        statusBanner.innerHTML = `
          <div style="color: #059669; font-weight: 700; font-size: 1.05rem;">
            🎉 Excellent! You are 100% Ready for Instant PM Surya Ghar Processing.
          </div>
          <p style="font-size: 0.875rem; color: #1E293B; margin-top: 0.35rem;">
            Om Agencies can submit your MSEDCL portal application within 24 hours of roof survey.
          </p>
        `;
      } else {
        statusBanner.innerHTML = `
          <div style="color: #B45309; font-weight: 700; font-size: 0.95rem;">
            ⏳ ${total - count} Document(s) Pending
          </div>
          <p style="font-size: 0.8125rem; color: #64748B; margin-top: 0.25rem;">
            Don't worry! Our N-11 HUDCO team assists you in fetching Index-II or linking your bank account for subsidy credit.
          </p>
        `;
      }
    }
  }

  // Localization Toggle Engine
  function updateLanguage(newLang) {
    state.lang = newLang;
    const dict = translations[newLang] || translations.en;

    const enBtn = document.getElementById('langEn');
    const mrBtn = document.getElementById('langMr');
    if (enBtn && mrBtn) {
      if (newLang === 'mr') {
        mrBtn.classList.add('lang-pill-active');
        enBtn.classList.remove('lang-pill-active');
      } else {
        enBtn.classList.add('lang-pill-active');
        mrBtn.classList.remove('lang-pill-active');
      }
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    renderCatalog();
  }

  // Setup Form Handlers
  function setupForms() {
    // Hero Lead Capture Form
    const heroForm = document.getElementById('heroLeadForm');
    if (heroForm) {
      heroForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = (document.getElementById('heroName') || {}).value || 'Homeowner';
        const phone = (document.getElementById('heroPhone') || {}).value || '';
        const service = (document.getElementById('heroService') || {}).value || 'Rooftop Solar EPC';
        const locality = (document.getElementById('heroLocality') || {}).value || 'N-11 HUDCO';
        const subDivision = (document.getElementById('heroSubDivision') || {}).value || 'HUDCO N-11 Sub-division';
        const billNote = state.attachedBillName ? `\n📸 *MSEDCL Bill Attached:* ${state.attachedBillName}` : '';

        state.lastSubmission = {
          name,
          phone,
          locality,
          service,
          subDivision,
          time: new Date().toLocaleTimeString()
        };

        const msg = `*NEW ROOFTOP SURVEY INQUIRY (Om Agencies)*\n\n` +
          `👤 *Name:* ${name}\n` +
          `📞 *Phone:* ${phone}\n` +
          `🛠️ *Service:* ${service}\n` +
          `📍 *Locality:* ${locality}\n` +
          `⚡ *MSEDCL Sub-Division:* ${subDivision}${billNote}\n` +
          `📅 *Time:* ${new Date().toLocaleString()}`;

        updateThankYouView(state.lastSubmission);

        window.open(`https://wa.me/919423393107?text=${encodeURIComponent(msg)}`, '_blank');
        window.location.hash = '#thank-you';
      });
    }

    // Bill Photo Input Trigger
    const billInput = document.getElementById('heroBillFile');
    const billDisplay = document.getElementById('billFileNameDisplay');
    if (billInput && billDisplay) {
      billInput.addEventListener('change', function () {
        if (this.files && this.files[0]) {
          state.attachedBillName = this.files[0].name;
          billDisplay.textContent = '✓ Attached: ' + this.files[0].name;
          billDisplay.style.color = '#059669';
        }
      });
    }

    // Detailed Contact / Site Survey Form
    const contactForm = document.getElementById('contactBookingForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = (document.getElementById('contactName') || {}).value || 'Customer';
        const phone = (document.getElementById('contactPhone') || {}).value || '';
        const service = (document.getElementById('contactService') || {}).value || 'Rooftop Solar EPC';
        const locality = (document.getElementById('contactLocality') || {}).value || 'N-11 HUDCO';
        const subDivision = (document.getElementById('contactSubDivision') || {}).value || 'HUDCO N-11';
        const date = (document.getElementById('contactDate') || {}).value || 'As soon as possible';
        const slot = (document.getElementById('contactSlot') || {}).value || 'Morning Slot (10 AM - 1 PM)';
        const notes = (document.getElementById('contactNotes') || {}).value || 'None';

        state.lastSubmission = {
          name,
          phone,
          service,
          locality,
          subDivision,
          dateSlot: `${date} (${slot})`,
          notes,
          time: new Date().toLocaleTimeString()
        };

        const msg = `*NEW SITE SURVEY / SERVICE BOOKING (Om Agencies)*\n\n` +
          `👤 *Client:* ${name}\n` +
          `📞 *Contact:* ${phone}\n` +
          `🛠️ *Service:* ${service}\n` +
          `📍 *Address/Area:* ${locality}, Sambhajinagar\n` +
          `⚡ *MSEDCL Sub-Division:* ${subDivision}\n` +
          `⏰ *Preferred Slot:* ${date} - ${slot}\n` +
          `📝 *Notes:* ${notes}`;

        updateThankYouView(state.lastSubmission);

        window.open(`https://wa.me/919423393107?text=${encodeURIComponent(msg)}`, '_blank');
        window.location.hash = '#thank-you';
      });
    }

    // Same-Day Repair Dispatcher
    const repairBtn = document.getElementById('dispatchRepairBtn');
    if (repairBtn) {
      repairBtn.addEventListener('click', function () {
        const area = (document.getElementById('repairAreaInput') || {}).value || 'Sambhajinagar';
        const service = state.repairService;
        const msg = `*URGENT SOLAR GEYSER SERVICE REQUEST*\n\n` +
          `🔧 *Required Service:* ${service}\n` +
          `📍 *Locality / Area:* ${area}, Chhatrapati Sambhajinagar\n` +
          `⚡ *Requirement:* Same-Day Inspection & Repair Quote`;

        window.open(`https://wa.me/919423393107?text=${encodeURIComponent(msg)}`, '_blank');
      });
    }
  }

  function updateThankYouView(sub) {
    if (!sub) return;
    const wrap = document.getElementById('thankYouDetails');
    if (wrap) {
      wrap.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <div><strong>Customer Name:</strong> ${sub.name}</div>
          <div><strong>Phone / WhatsApp:</strong> ${sub.phone}</div>
          <div><strong>Requested Service:</strong> ${sub.service || 'Solar Consultation'}</div>
          <div><strong>Locality:</strong> ${sub.locality}</div>
          <div><strong>MSEDCL Sub-Division:</strong> ${sub.subDivision || 'Sambhajinagar'}</div>
          <div><strong>Submission Time:</strong> ${sub.time}</div>
          <div style="margin-top: 0.5rem; font-size: 0.8125rem; color: #059669; font-weight: 600;">
            ✓ Direct WhatsApp ticket generated to D. B. Magar (+91 94233 93107)
          </div>
        </div>
      `;
    }
  }

  // Event Listeners Initialization
  function initEvents() {
    window.addEventListener('hashchange', handleRoute);

    // Header scroll shadow
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.global-header');
      if (header) {
        if (window.scrollY > 10) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    });

    // Mobile Hamburger
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const drawer = document.getElementById('mobileDrawer');
    if (mobileBtn && drawer) {
      mobileBtn.addEventListener('click', () => {
        drawer.classList.toggle('open');
      });
    }

    // Language switchers
    const langEn = document.getElementById('langEn');
    const langMr = document.getElementById('langMr');
    if (langEn) langEn.addEventListener('click', () => updateLanguage('en'));
    if (langMr) langMr.addEventListener('click', () => updateLanguage('mr'));

    // Calculator Bill Slider
    const slider = document.getElementById('calcBillSlider');
    if (slider) {
      slider.addEventListener('input', function (e) {
        state.calc.billAmount = parseInt(e.target.value, 10);
        recalculate();
      });
    }

    // Synchronized Direct Number Input
    const numInput = document.getElementById('calcBillNumberInput');
    if (numInput) {
      numInput.addEventListener('input', function (e) {
        let val = parseInt(e.target.value, 10);
        if (isNaN(val)) val = 1000;
        val = Math.max(1000, Math.min(25000, val));
        state.calc.billAmount = val;
        recalculate();
      });
    }

    // Calculator Mode Tabs
    document.querySelectorAll('.calc-mode-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.calc-mode-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        state.calc.mode = this.getAttribute('data-mode');
        recalculate();
      });
    });

    // Loan EMI Toggle
    const emiToggle = document.getElementById('calcEmiToggle');
    if (emiToggle) {
      emiToggle.addEventListener('change', function () {
        state.calc.enableLoan = this.checked;
        const badge = document.getElementById('calcEmiBadgeWrap');
        if (badge) {
          badge.style.display = this.checked ? 'flex' : 'none';
        }
      });
    }

    // Proposal Modal Triggers
    const openPropBtn = document.getElementById('openProposalBtn');
    if (openPropBtn) openPropBtn.addEventListener('click', openProposalModal);

    const closePropBtn = document.getElementById('closeProposalBtn');
    if (closePropBtn) closePropBtn.addEventListener('click', closeProposalModal);

    const printPropBtn = document.getElementById('printProposalBtn');
    if (printPropBtn) printPropBtn.addEventListener('click', () => window.print());

    const sharePropBtn = document.getElementById('shareProposalBtn');
    if (sharePropBtn) sharePropBtn.addEventListener('click', shareQuote);

    // Wizard Choice Buttons
    document.querySelectorAll('.wizard-water-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.wizard-water-btn').forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
        state.wizard.water = this.getAttribute('data-water');
        updateWizardRecommendation();
      });
    });

    document.querySelectorAll('.wizard-bath-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.wizard-bath-btn').forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
        state.wizard.bathrooms = this.getAttribute('data-baths');
        updateWizardRecommendation();
      });
    });

    // Catalog Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        state.catalogFilter = this.getAttribute('data-filter');
        renderCatalog();
      });
    });

    // Proof Neighborhood Filter Buttons
    document.querySelectorAll('.proof-filter-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.proof-filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        state.proofFilter = this.getAttribute('data-locality');
        renderCaseStudies();
      });
    });

    // Repair Service Chips
    document.querySelectorAll('.service-chip-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.service-chip-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        state.repairService = this.getAttribute('data-service');
      });
    });

    // FAQ Accordion
    document.querySelectorAll('.faq-question-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const item = this.closest('.faq-item');
        if (item) {
          const isOpen = item.classList.contains('open');
          document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
          if (!isOpen) {
            item.classList.add('open');
          }
        }
      });
    });

    // Checklist Toggles
    ['bill', 'aadhaar', 'roof', 'bank'].forEach(key => {
      const input = document.getElementById('chk-' + key);
      const card = document.getElementById('item-' + key);
      if (input && card) {
        input.addEventListener('change', () => {
          state.checklist[key] = input.checked;
          if (input.checked) {
            card.classList.add('checked');
          } else {
            card.classList.remove('checked');
          }
          updateChecklist();
        });
      }
    });

    setupForms();
  }

  // App Initialization
  document.addEventListener('DOMContentLoaded', () => {
    initEvents();
    renderCatalog();
    renderCaseStudies();
    updateWizardRecommendation();
    recalculate();
    updateChecklist();
    handleRoute();
  });

})();
