export default function sampler(root) {
  var ROOT = root || document.getElementById('bikini-fit-finder');
  if (!ROOT) return;
  var AXES = ['coverage', 'support', 'boldness', 'comfort', 'trend'];
  var AXIS_LABEL = { coverage: 'Coverage', support: 'Support', boldness: 'Boldness', comfort: 'Ease', trend: 'Trend' };
  var AXIS_DESC = {
    coverage: 'How much skin the cut shows, from minimal to fully covered.',
    support: 'How secure and lifted it feels, especially for moving around.',
    boldness: 'How daring the silhouette and cut-outs are, from subtle to statement-making.',
    comfort: 'How easy and low-fuss it feels day to day.',
    trend: 'How current the style is, from timeless to trending right now.'
  };

  // ---- small icon set (currentColor so CSS controls the tint) ----
  var ICONS = {
    minimal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 9l6 5 6-5"/><path d="M12 14v6"/></svg>',
    balanced: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 10c3-4 13-4 16 0"/><path d="M6 10v6M18 10v6"/></svg>',
    full: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="8" width="14" height="10" rx="3"/></svg>',
    light: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14"/></svg>',
    everyday: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 9c2 3 10 3 12 0"/><path d="M6 15c2-3 10-3 12 0"/></svg>',
    max: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 8h16M4 12h16M4 16h16"/></svg>',
    classic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="7"/></svg>',
    retro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 16c2-6 6-9 8-9s6 3 8 9"/></svg>',
    bold: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4z"/></svg>',
    sporty: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 12h16"/><path d="M8 6l-4 6 4 6M16 6l4 6-4 6"/></svg>',
    pool: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 17c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"/><circle cx="12" cy="8" r="3"/></svg>',
    active: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 18l5-5 3 3 8-8"/></svg>',
    vacation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v6M8 5.5l4 3.5 4-3.5"/><path d="M4 20c2-3 14-3 16 0"/></svg>',
    bonfire: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21c-4 0-6-2.5-6-5.5 0-2 1.2-3.3 2-4.5.3 1 1 1.8 1.8 1.8-.4-3 1-5.3 3.2-6.8-.6 2 .2 3 1.4 3.6 1.6.8 2.6 2.6 2.6 4.4 0 3.3-2 7-5 7z"/></svg>',
    solid: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="5" width="14" height="14" rx="3"/></svg>',
    colorblock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/></svg>',
    pattern: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="7" cy="7" r="1.6"/><circle cx="14" cy="6" r="1.6"/><circle cx="10" cy="12" r="1.6"/><circle cx="17" cy="13" r="1.6"/><circle cx="6" cy="17" r="1.6"/><circle cx="13" cy="18" r="1.6"/></svg>',
    pastel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 4c3 3 6 5.5 6 9a6 6 0 01-12 0c0-3.5 3-6 6-9z"/></svg>',
    cheeky: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 9c3-2 13-2 16 0l-3 8H7z"/></svg>',
    bottomclassic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 8c3-1.5 13-1.5 16 0l-2.5 10h-11z"/></svg>',
    highwaist: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 6c3-1 11-1 14 0l-2 13H7z"/><path d="M6 9h12"/></svg>',
    fullbottom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7c3-1.2 13-1.2 16 0l-1.5 12h-13z"/></svg>'
  };


  var QUESTIONS = [
    {
      q: 'How much coverage feels right?',
      options: [
        { label: 'Minimal & barely-there', icon: 'minimal', d: { coverage: -3, boldness: 1 } },
        { label: 'Balanced coverage', icon: 'balanced', d: { coverage: 0, comfort: 1 } },
        { label: 'Full & secure', icon: 'full', d: { coverage: 3, comfort: 1 } }
      ]
    },
    {
      q: "What's your priority up top?",
      options: [
        { label: 'Light & barely-there', icon: 'light', d: { support: -3, boldness: 1 } },
        { label: 'Everyday support', icon: 'everyday', d: { support: 0, comfort: 1 } },
        { label: 'Maximum hold', icon: 'max', d: { support: 3, comfort: 2 } }
      ]
    },
    {
      q: 'Pick your vibe',
      options: [
        { label: 'Timeless classic', icon: 'classic', d: { boldness: -2, trend: -2, comfort: 1 } },
        { label: 'Retro-inspired', icon: 'retro', d: { boldness: 0, trend: 0, coverage: 1 } },
        { label: 'Bold & statement', icon: 'bold', d: { boldness: 3, trend: 2 } },
        { label: 'Sporty & sleek', icon: 'sporty', d: { boldness: -2, comfort: 2, support: 1 } }
      ]
    },
    {
      q: 'Where will you wear it most?',
      options: [
        { label: 'Poolside, lounging', icon: 'pool', d: { comfort: 1, boldness: 1 } },
        { label: 'Active swimming', icon: 'active', d: { support: 2, comfort: 2, coverage: 1 } },
        { label: 'Vacation & photos', icon: 'vacation', d: { trend: 2, boldness: 1 } },
        { label: 'Beach bonfires', icon: 'bonfire', d: { trend: 1, coverage: -1 } }
      ]
    },
    {
      q: "Pick a print you're drawn to",
      options: [
        { label: 'Solid neutral', icon: 'solid', d: { boldness: -1, trend: -1 } },
        { label: 'Bold color block', icon: 'colorblock', d: { boldness: 2, trend: 1 } },
        { label: 'Pattern & print', icon: 'pattern', d: { trend: 2, boldness: 1 } },
        { label: 'Soft pastel', icon: 'pastel', d: { boldness: -1, trend: 0 } }
      ]
    },
    {
      q: 'Bottom style preference',
      options: [
        { label: 'Cheeky', icon: 'cheeky', d: { coverage: -3, boldness: 1 } },
        { label: 'Classic cut', icon: 'bottomclassic', d: { coverage: 0 } },
        { label: 'High-waisted', icon: 'highwaist', d: { coverage: 2, trend: 1, comfort: 1 } },
        { label: 'Full coverage', icon: 'fullbottom', d: { coverage: 3, comfort: 1 } }
      ]
    }
  ];

  // ---- DEMO product archetypes — swap these for your real catalog ----
  // vector values are 0–10 per axis. handle is a placeholder Shopify handle.
  var PRODUCTS = [
    {
      name: 'Classic Triangle Set', handle: 'classic-triangle-set',
      blurb: 'A everyday staple: light, adjustable, and easy to wear anywhere.',
      vector: { coverage: 4, support: 3, boldness: 4, comfort: 6, trend: 4 }
    },
    {
      name: 'Micro Cheeky Bikini', handle: 'micro-cheeky-bikini',
      blurb: 'Minimal coverage with maximum confidence — built for tanning, not laps.',
      vector: { coverage: 1, support: 2, boldness: 8, comfort: 3, trend: 6 }
    },
    {
      name: 'Sporty Cut Bikini', handle: 'sporty-cut-bikini',
      blurb: 'Secure, supportive, and built to stay put through real swimming.',
      vector: { coverage: 6, support: 8, boldness: 2, comfort: 8, trend: 4 }
    },
    {
      name: 'Retro High-Waisted Set', handle: 'retro-high-waisted-set',
      blurb: 'Vintage-inspired coverage with a flattering, comfortable fit.',
      vector: { coverage: 7, support: 5, boldness: 5, comfort: 7, trend: 6 }
    },
    {
      name: 'Bold Cut-Out Halter', handle: 'bold-cut-out-halter',
      blurb: 'The statement piece — sculptural cut-outs made for vacation photos.',
      vector: { coverage: 4, support: 6, boldness: 9, comfort: 4, trend: 9 }
    },
    {
      name: 'Bandeau Bralette Set', handle: 'bandeau-bralette-set',
      blurb: 'Strapless and trend-forward, for lounging over laps.',
      vector: { coverage: 3, support: 2, boldness: 6, comfort: 3, trend: 7 }
    }
  ];

  var state = { step: -1, picks: [] }; 

  function clampAxis(v) { return Math.max(0, Math.min(10, v)); }

  function computeVector() {
    var v = { coverage: 5, support: 5, boldness: 5, comfort: 5, trend: 5 };
    state.picks.forEach(function (opt) {
      AXES.forEach(function (ax) {
        if (opt.d[ax] !== undefined) v[ax] += opt.d[ax];
      });
    });
    AXES.forEach(function (ax) { v[ax] = clampAxis(v[ax]); });
    return v;
  }

  function distance(a, b) {
    var sum = 0;
    AXES.forEach(function (ax) { var diff = a[ax] - b[ax]; sum += diff * diff; });
    return Math.sqrt(sum);
  }

  function rankMatches(vec) {
    return PRODUCTS.map(function (p) { return { product: p, dist: distance(vec, p.vector) }; })
      .sort(function (a, b) { return a.dist - b.dist; });
  }

  // ---- radar chart (hand-drawn SVG "sun compass") ----
  function polygonPoints(vec, cx, cy, r) {
    return AXES.map(function (ax, i) {
      var angle = (-90 + i * (360 / AXES.length)) * Math.PI / 180;
      var val = vec[ax] / 10 * r;
      return (cx + Math.cos(angle) * val).toFixed(1) + ',' + (cy + Math.sin(angle) * val).toFixed(1);
    }).join(' ');
  }

  var RADAR_CX = 150, RADAR_CY = 150, RADAR_R = 105;

  function axisAngle(i) { return (-90 + i * (360 / AXES.length)) * Math.PI / 180; }
  function axisUnit(i) { var a = axisAngle(i); return { x: Math.cos(a), y: Math.sin(a) }; }

  function svgEl(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }

  // Builds the interactive radar: static grid/spokes/labels, a live "You" shape
  // with draggable end nodes, and a dashed "best match" outline that updates
  // whenever the closest product changes. Returns handles the caller can use
  // to wire up live updates (see renderResult).
  function buildRadar(vec, matchVec, onVectorChange) {
    var cx = RADAR_CX, cy = RADAR_CY, r = RADAR_R;
    var svg = svgEl('svg', { viewBox: '0 0 300 300', xmlns: 'http://www.w3.org/2000/svg' });

    // grid rings
    [0.2, 0.4, 0.6, 0.8, 1].forEach(function (f) {
      var pts = AXES.map(function (ax, i) {
        var u = axisUnit(i);
        return (cx + u.x * f * r).toFixed(1) + ',' + (cy + u.y * f * r).toFixed(1);
      }).join(' ');
      svg.appendChild(svgEl('polygon', { points: pts, fill: 'none', stroke: 'rgba(30,42,50,0.14)', 'stroke-width': '1' }));
    });

    // spokes
    AXES.forEach(function (ax, i) {
      var u = axisUnit(i);
      svg.appendChild(svgEl('line', {
        x1: cx, y1: cy, x2: (cx + u.x * r).toFixed(1), y2: (cy + u.y * r).toFixed(1),
        stroke: 'rgba(30,42,50,0.14)', 'stroke-width': '1'
      }));
    });

    // best-match outline (updated live, no fill so the user shape stays readable on top)
    var matchPoly = svgEl('polygon', {
      points: polygonPoints(matchVec, cx, cy, r),
      fill: 'none', stroke: '#0D6E6A', 'stroke-width': '2', 'stroke-dasharray': '5 4'
    });
    svg.appendChild(matchPoly);

    // user shape (updated live as handles are dragged)
    var userPoly = svgEl('polygon', {
      points: polygonPoints(vec, cx, cy, r),
      fill: '#FF5D4E', 'fill-opacity': '0.32', stroke: '#E8432F', 'stroke-width': '2.5'
    });
    svg.appendChild(userPoly);

    // shared tooltip bubble, positioned relative to the radar wrapper
    var tooltip = document.createElement('div');
    tooltip.className = 'bff-tooltip';
    var radarWrap; // set by caller after insertion into the DOM

    function showTooltip(text, clientX, clientY) {
      if (!radarWrap) return;
      var rect = radarWrap.getBoundingClientRect();
      tooltip.textContent = text;
      tooltip.style.left = (clientX - rect.left + 14) + 'px';
      tooltip.style.top = (clientY - rect.top - 10) + 'px';
      tooltip.classList.add('is-visible');
    }
    function hideTooltip() { tooltip.classList.remove('is-visible'); }

    // axis labels + a larger invisible hover target around each, for the tooltip
    var handles = [];
    AXES.forEach(function (ax, i) {
      var u = axisUnit(i);
      var labelX = cx + u.x * (r + 24), labelY = cy + u.y * (r + 24);
      var anchor = u.x > 0.3 ? 'start' : (u.x < -0.3 ? 'end' : 'middle');

      var hit = svgEl('circle', { cx: labelX.toFixed(1), cy: labelY.toFixed(1), r: '16', fill: 'transparent', class: 'bff-axis-hit' });
      hit.addEventListener('mouseenter', function (e) { showTooltip(AXIS_DESC[ax], e.clientX, e.clientY); });
      hit.addEventListener('mousemove', function (e) { showTooltip(AXIS_DESC[ax], e.clientX, e.clientY); });
      hit.addEventListener('mouseleave', hideTooltip);
      hit.addEventListener('pointerup', function (e) {
        if (e.pointerType !== 'touch') return;
        // tap-to-toggle fallback for touch devices, which have no hover
        if (tooltip.classList.contains('is-visible')) { hideTooltip(); return; }
        showTooltip(AXIS_DESC[ax], e.clientX, e.clientY);
      });
      svg.appendChild(hit);

      var label = svgEl('text', {
        x: labelX.toFixed(1), y: labelY.toFixed(1), 'text-anchor': anchor,
        'font-size': '12', 'font-weight': '700', fill: '#1E2A32',
        'font-family': 'Work Sans, sans-serif', class: 'bff-axis-label'
      });
      label.textContent = AXIS_LABEL[ax];
      svg.appendChild(label);

      // draggable end node — constrained to move along its own spoke
      var vx = cx + u.x * (vec[ax] / 10 * r), vy = cy + u.y * (vec[ax] / 10 * r);
      var handle = svgEl('circle', {
        cx: vx.toFixed(1), cy: vy.toFixed(1), r: '7',
        fill: '#E8432F', stroke: '#fff', 'stroke-width': '2', class: 'bff-handle'
      });

      (function (axis, unit, handleEl) {
        var dragging = false;
        handleEl.addEventListener('pointerdown', function (e) {
          dragging = true;
          handleEl.setPointerCapture(e.pointerId);
          e.preventDefault();
        });
        handleEl.addEventListener('pointermove', function (e) {
          if (!dragging) return;
          var rect = svg.getBoundingClientRect();
          var scaleX = 300 / rect.width, scaleY = 300 / rect.height;
          var px = (e.clientX - rect.left) * scaleX, py = (e.clientY - rect.top) * scaleY;
          var projected = (px - cx) * unit.x + (py - cy) * unit.y;
          var value = clampAxis(Math.round((projected / r) * 10));
          vec[axis] = value;
          var nx = cx + unit.x * (value / 10 * r), ny = cy + unit.y * (value / 10 * r);
          handleEl.setAttribute('cx', nx.toFixed(1));
          handleEl.setAttribute('cy', ny.toFixed(1));
          userPoly.setAttribute('points', polygonPoints(vec, cx, cy, r));
          showTooltip(AXIS_LABEL[axis] + ': ' + value + '/10', e.clientX, e.clientY);
          if (onVectorChange) onVectorChange(vec, matchPoly);
        });
        handleEl.addEventListener('pointerup', function (e) {
          dragging = false;
          hideTooltip();
          try { handleEl.releasePointerCapture(e.pointerId); } catch (err) { }
        });
        handleEl.addEventListener('pointercancel', function () { dragging = false; hideTooltip(); });
      })(ax, u, handle);

      svg.appendChild(handle);
      handles.push(handle);
    });

    return {
      svg: svg,
      tooltip: tooltip,
      matchPoly: matchPoly,
      setRadarWrap: function (el) { radarWrap = el; },
      setMatchVector: function (mv) { matchPoly.setAttribute('points', polygonPoints(mv, cx, cy, r)); }
    };
  }

  // ---- render ----
  function renderProgress() {
    var dots = '';
    for (var i = 0; i < QUESTIONS.length; i++) {
      var cls = 'bff-dot';
      if (i < state.step) cls += ' is-done';
      if (i === state.step) cls += ' is-current';
      dots += '<div class="' + cls + '"></div>';
    }
    return '<div class="bff-progress">' + dots + '</div>';
  }

  function renderIntro() {
    ROOT.innerHTML =
      '<p class="bff-eyebrow">Fit Finder</p>' +
      '<h2 class="bff-title">Find your best-fit bikini in six quick taps</h2>' +
      '<p class="bff-sub">Answer a few style questions and we\u2019ll map your preferences to the styles you\u2019re most likely to love.</p>' +
      '<div class="bff-card"><div class="bff-actions" style="justify-content:flex-end">' +
      '<button class="bff-primary-btn" id="bff-start">Start the quiz</button>' +
      '</div></div>';
    document.getElementById('bff-start').addEventListener('click', function () {
      state.step = 0;
      render();
    });
  }

  function renderQuestion() {
    var q = QUESTIONS[state.step];
    var picked = state.picks[state.step];
    var optsHTML = q.options.map(function (opt, i) {
      var isPicked = picked === opt;
      return '<button class="bff-opt' + (isPicked ? ' is-picked' : '') + '" data-i="' + i + '">' +
        ICONS[opt.icon] + '<span>' + opt.label + '</span></button>';
    }).join('');

    ROOT.innerHTML =
      '<p class="bff-eyebrow">Fit Finder \u2014 Question ' + (state.step + 1) + ' of ' + QUESTIONS.length + '</p>' +
      renderProgress() +
      '<div class="bff-card">' +
      '<h3 class="bff-q">' + q.q + '</h3>' +
      '<div class="bff-options">' + optsHTML + '</div>' +
      '<div class="bff-actions">' +
      (state.step > 0 ? '<button class="bff-link-btn" id="bff-back">\u2190 Back</button>' : '<span></span>') +
      '<button class="bff-primary-btn" id="bff-next" ' + (picked ? '' : 'disabled') + '>' +
      (state.step === QUESTIONS.length - 1 ? 'See my matches' : 'Next') + '</button>' +
      '</div></div>';

    var buttons = ROOT.querySelectorAll('.bff-opt');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.picks[state.step] = q.options[parseInt(btn.getAttribute('data-i'), 10)];
        render();
      });
    });
    var nextBtn = document.getElementById('bff-next');
    if (nextBtn) nextBtn.addEventListener('click', function () {
      if (!state.picks[state.step]) return;
      state.step++;
      render();
    });
    var backBtn = document.getElementById('bff-back');
    if (backBtn) backBtn.addEventListener('click', function () {
      state.step--;
      render();
    });
  }

  function runnersHTML(list) {
    return list.map(function (r) {
      return '<div class="bff-runner-row"><span>' + r.product.name + '</span>' +
        '<a href="/products/' + r.product.handle + '">View \u2192</a></div>';
    }).join('');
  }

  function renderResult() {
    // computed fresh from quiz answers once; from here on the visitor can
    // fine-tune it directly via the draggable radar nodes.
    state.vector = computeVector();
    var vec = state.vector;
    var ranked = rankMatches(vec);
    var top = ranked[0];

    ROOT.innerHTML =
      '<p class="bff-eyebrow">Your fit profile</p>' +
      '<h2 class="bff-title">Here\u2019s what fits your style</h2>' +
      '<div class="bff-card"><div class="bff-result-grid">' +
      '<div><div class="bff-radar-wrap" id="bff-radar-host"></div>' +
      '<p class="bff-hint">Drag the dots to fine-tune \u00b7 hover a label to see what it means</p>' +
      '<div class="bff-legend"><span><i style="background:#E8432F"></i>You</span>' +
      '<span><i style="background:#0D6E6A"></i><span id="bff-legend-match-name">' + top.product.name + '</span></span></div>' +
      '</div>' +
      '<div><p class="bff-eyebrow">Best match</p>' +
      '<h3 class="bff-match-name" id="bff-match-name">' + top.product.name + '</h3>' +
      '<p class="bff-match-blurb" id="bff-match-blurb">' + top.product.blurb + '</p>' +
      '<button class="bff-primary-btn" id="bff-view" data-handle="' + top.product.handle + '">View this style \u2192</button>' +
      '<div class="bff-runners"><p class="bff-runners-label">Also worth a look</p><div id="bff-runners-list">' + runnersHTML(ranked.slice(1, 3)) + '</div></div>' +
      '</div></div>' +
      '<div class="bff-actions" style="margin-top:20px"><button class="bff-link-btn" id="bff-retake">\u21bb Retake the quiz</button><span></span></div>' +
      '</div>';

    var matchNameEl = document.getElementById('bff-match-name');
    var matchBlurbEl = document.getElementById('bff-match-blurb');
    var legendMatchNameEl = document.getElementById('bff-legend-match-name');
    var viewBtn = document.getElementById('bff-view');
    var runnersListEl = document.getElementById('bff-runners-list');
    var lastTopHandle = top.product.handle;

    // called on every drag move — recomputes the ranking against the live
    // vector and only touches the DOM nodes that actually need to change
    function updateMatchUI(currentVec, matchPolyEl) {
      var newRanked = rankMatches(currentVec);
      var newTop = newRanked[0];
      if (newTop.product.handle !== lastTopHandle) {
        lastTopHandle = newTop.product.handle;
        matchNameEl.textContent = newTop.product.name;
        matchBlurbEl.textContent = newTop.product.blurb;
        legendMatchNameEl.textContent = newTop.product.name;
        viewBtn.setAttribute('data-handle', newTop.product.handle);
        matchPolyEl.setAttribute('points', polygonPoints(newTop.product.vector, RADAR_CX, RADAR_CY, RADAR_R));
      }
      runnersListEl.innerHTML = runnersHTML(newRanked.slice(1, 3));
    }

    var radar = buildRadar(vec, top.product.vector, updateMatchUI);
    var radarHost = document.getElementById('bff-radar-host');
    radarHost.appendChild(radar.svg);
    radarHost.appendChild(radar.tooltip);
    radar.setRadarWrap(radarHost);

    viewBtn.addEventListener('click', function (e) {
      window.location.href = '/products/' + e.currentTarget.getAttribute('data-handle');
    });
    document.getElementById('bff-retake').addEventListener('click', function () {
      state = { step: -1, picks: [] };
      render();
    });
  }

  function render() {
    if (state.step === -1) return renderIntro();
    if (state.step < QUESTIONS.length) return renderQuestion();
    return renderResult();
  }

  render();
};
