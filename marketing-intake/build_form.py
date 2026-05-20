# -*- coding: utf-8 -*-
import pathlib

out = pathlib.Path(__file__).parent / "index.html"

html = """<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>2026 \ub9c8\ucf00\ud305 \ud50c\ub79c \u2014 \uae30\ucd08 \uc790\ub8cc \uc694\uccad</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <motion class="wrap">
    <header>
      <h1>2026 \uae00\ub85c\ubc8c \ube0c\ub79c\ub529\u00b7\ub9c8\ucf00\ud305 \ud50c\ub79c</h1>
      <p>\uae30\ucd08 \uc790\ub8cc \uc694\uccad \u00b7 \uc5d0\ucf54\uae00\ub85c\ubc8c\uadf8\ub8f9 \u00b7 \ub2f4\ub2f9 \uc601\uc5ed\ub9cc \uc791\uc131\ud574\ub3c4 \ub429\ub2c8\ub2e4</p>
      <motion class="actor-input">
        <input type="text" id="actorName" placeholder="\ubc30\uc6b0\uba85 \uc785\ub825 (\uc608: \ud64d\uae38\ub3d9)">
      </motion>
    </header>
    <motion class="card">
      <h2>\uc5b4\ub5a4 \ud300\uc73c\ub85c \uc791\uc131\ud558\uc2dc\ub098\uc694?</h2>
      <p class="sub">\ud300\uc744 \uace0\ub974\uba74 \ud574\ub2f9 \uc9c8\ubb38\ub9cc \ud45c\uc2dc\ub429\ub2c8\ub2e4. \uc5ec\ub7ec \ud300\uc774\uba74 \ud300\ubcc4\ub85c \ud55c \ubc88\uc529 \uc81c\ucd9c\ud574 \uc8fc\uc138\uc694.</p>
      <motion class="team-tabs" id="teamTabs"></motion>
    </motion>
    <form id="mainForm">
      <motion class="card section-always">
        <h2>\uc751\ub2f5\uc790 \uc815\ubcf4</h2>
        <p class="sub">\ubaa8\ub4e0 \ud300 \uacf5\ud1b5</p>
        <motion class="row">
          <motion><label>\uc18c\uc18d\uc0ac\u00b7\ub9e4\ub2c8\uc9c0\uba3c\ud2b8 <span class="req">*</span></label><input name="agency" required></motion>
          <motion><label>\uc791\uc131\uc790 \uc131\ud568 <span class="req">*</span></label><input name="writer" required></motion>
        </motion>
        <motion class="row">
          <motion><label>\uc5f0\ub77d\ucc98 <span class="req">*</span></label><input name="contact" required placeholder="\uc774\uba54\uc77c \ub610\ub294 \uc804\ud654"></motion>
          <motion><label>\uacf5\uac1c \ubc94\uc704 <span class="req">*</span></label>
            <select name="visibility" required><option value="">\uc120\ud0dd</option><option>\ub0b4\ubd80 \uc804\uc6a9</option>
            <option>\ubc30\uc6b0\u00b7\ub9e4\ub2c8\uc9c0\uba3c\ud2b8 \uacf5\uc720 \uac00\ub2a5</option><option>\ub300\uc678\ube44</option></select></motion>
        </motion>
        <label>\ucca8\ubd80 \ud30c\uc77c (Drive \ub9c1\ud06c)</label><input type="url" name="driveLink" placeholder="https://drive.google.com/...">
      </motion>
      <motion class="card section-always">
        <h2>\uacf5\ud1b5 \uae30\ucd08 (4\ubb38\ud56d)</h2>
        <label>\ube0c\ub79c\ub4dc \ud0a4\uc6cc\ub4dc 3~5\uac1c <span class="req">*</span></label>
        <input name="keywords" required placeholder="\uc608: \ud504\ub9ac\ubbf8\uc5c4, \ucc28\ubd84\ud568">
        <label>2026 \ud55c \uc904 \ubaa9\ud45c\u00b7KPI <span class="req">*</span></label><textarea name="kpi" required></textarea>
        <label>\uc6d4\ubcc4 \uc77c\uc815 \uc694\uc57d <span class="req">*</span></label><textarea name="schedule" required></textarea>
        <label>\uc81c\uc57d\u00b7\ubd88\uac00 \uc0ac\ud56d <span class="req">*</span></label><textarea name="restrictions" required></textarea>
      </motion>
      <motion class="card section-team" data-team="management">
        <h2>\ub9e4\ub2c8\uc9c0\uba3c\ud2b8 / \uc18c\uc18d\uc0ac</h2>
        <label>2026 \uc6b0\uc120\uc21c\uc704 Top 3 <span class="req">*</span></label><textarea name="m_priority" data-team-required="management"></textarea>
        <label>\ud655\uc815\u00b7\ud611\uc758 \uc791\ud488 + \uc77c\uc815 <span class="req">*</span></label><textarea name="m_works" data-team-required="management"></textarea>
        <label>\ud574\uc678\u00b7\ud32c\ubbf8\ud305 \uc758\ud5a5 <span class="req">*</span></label><textarea name="m_overseas" data-team-required="management"></textarea>
        <label>\uc2b9\uc778 \ub77c\uc778\u00b7\uc18c\uc694 \uae30\uac04</label><textarea name="m_approval"></textarea>
        <label>\ubc30\uc6b0 \uc131\ud5a5\u00b7\uae08\uae30 <span class="req">*</span></label><textarea name="m_persona" data-team-required="management"></textarea>
        <label>\uc5d0\ucf54\u00b7\uc678\ubd80 \uc5ed\ud560 \ubd84\ub2f4</label><textarea name="m_roles"></textarea>
      </motion>
      <motion class="card section-team" data-team="pr">
        <h2>PR \u00b7 \ud64d\ubcf4</h2>
        <label>\ud504\ub85c\ud544 \ub9ac\uc14b <span class="req">*</span></label><textarea name="p_profile" data-team-required="pr"></textarea>
        <label>\uc5f0\uac04 \ubcf4\ub3c4\u00b7\uc778\ud130\ubdf0 <span class="req">*</span></label><textarea name="p_press" data-team-required="pr"></textarea>
        <label>\uc791\ud488\ubcc4 \ud64d\ubcf4 \uc77c\uc815 <span class="req">*</span></label><textarea name="p_works" data-team-required="pr"></textarea>
        <label>\ud654\ubcf4\u00b7\ud589\uc0ac\u00b7\uc2dc\uc0c1\uc2dd</label><textarea name="p_events"></textarea>
        <label>\ud76c\ub9dd \ub9e4\uccb4\u00b7\ud504\ub85c\uadf8\ub7a8</label><textarea name="p_media"></textarea>
        <label>SNS \uc6b4\uc601 \ubc29\ud5a5</label><textarea name="p_sns"></textarea>
      </motion>
      <motion class="card section-team" data-team="marketing">
        <h2>\ub9c8\ucf00\ud305 \u00b7 \ube0c\ub79c\ub529</h2>
        <label>2026 \ud55c \uc904 \uc804\ub7b5 <span class="req">*</span></label><input name="k_strategy" data-team-required="marketing">
        <label>\uc6d4\ubcc4 \ub9c8\uc77c\uc2a4\ud1a4 <span class="req">*</span></label><textarea name="k_milestones" data-team-required="marketing"></textarea>
        <label>\uce90\ub9ad\ud130 vs \ubc30\uc6b0 (1~10)</label>
        <motion class="scale"><span>1</span><input type="range" name="k_scale" min="1" max="10" value="5"><span>10</span><span class="scale-val" id="kScaleVal">5</span></motion>
        <label>\ub7ec\uc2dc\ub9ac\u00b7\ucf5c\ub77c\ubcf4\u00b7\ubc14\uc774\ub7f4 <span class="req">*</span></label><textarea name="k_brand" data-team-required="marketing"></textarea>
        <label>\ucc28\ubcc4\ud654\u00b72027 \uc5f0\uc18d\uc131</label><textarea name="k_diff"></textarea>
      </motion>
      <motion class="card section-team" data-team="sales">
        <h2>\uc138\uc77c\uc988 \u00b7 \ube44\uc988</h2>
        <label>2025 \uc81c\uc548\u00b7\uc131\uc0ac \uc694\uc57d <span class="req">*</span></label><textarea name="s_2025" data-team-required="sales"></textarea>
        <label>\uac15\uc810 \uc5c5\uc885\u00b7\uc9c4\ud589 \ube0c\ub79c\ub4dc <span class="req">*</span></label><textarea name="s_brands" data-team-required="sales"></textarea>
        <label>\ub4dc\ub7a9 \uc0ac\uc720\u00b7\ube44\ud76c\ub9dd \uc5c5\uc885</label><textarea name="s_drop"></textarea>
        <label>2026 \ube0c\ub79c\ub4dc \ub9e4\uce6d <span class="req">*</span></label><textarea name="s_roadmap" data-team-required="sales"></textarea>
        <label>\ud3ec\ud2b8\ud3f4\ub9ac\uc624 \ub9c1\ud06c</label><input type="url" name="s_link">
      </motion>
      <motion class="card section-team" data-team="fan">
        <h2>\ud32c\ub364 \u00b7 \ud32c\ubbf8\ud305</h2>
        <label>\ud32c\ubbf8\ud305 \uacc4\ud68d <span class="req">*</span></label>
        <select name="f_plan" data-team-required="fan"><option value="">\uc120\ud0dd</option><option>\uad6d\ub0b4 \ub2e8\ub3c5</option>
        <option>\ud574\uc678 \ud22c\uc5b4</option><option>\ub458 \ub2e4</option><option>\uac80\ud1a0 \uc911</option><option>\uc5c6\uc74c</option></select>
        <label>\uc2dc\uae30\u00b7\ub3c4\uc2dc\u00b7\uaddc\ubaa8 <span class="req">*</span></label><textarea name="f_when" data-team-required="fan"></textarea>
        <label>\ucf58\uc149\ud2b8\u00b7MD <span class="req">*</span></label><textarea name="f_md" data-team-required="fan"></textarea>
        <label>\ud32c\ub364 \ub370\uc774\ud130\u00b7\uac70\uc810</label><textarea name="f_data"></textarea>
        <label>\ubc30\uc6b0 \ubd80\ub2f4\u00b7\uc120\ud638</label><textarea name="f_pref"></textarea>
      </motion>
      <motion class="card section-team" data-team="content">
        <h2>\ucf58\ud150\uce20 \u00b7 SNS \u00b7 \ubc14\uc774\ub7f4</h2>
        <label>\ucc44\ub110 URL\u00b7\uc804\ub7b5 <span class="req">*</span></label><textarea name="v_channels" data-team-required="content"></textarea>
        <label>\ucd94\ucc9c 1\uc548 \ucc44\ub110\u00b7\uadfc\uac70 <span class="req">*</span></label><textarea name="v_main" data-team-required="content"></textarea>
        <label>\ubc14\uc774\ub7f4\u00b7\uc791\ud488 \uc77c\uc815 <span class="req">*</span></label><textarea name="v_viral" data-team-required="content"></textarea>
        <label>\ub808\ud37c\ub7f0\uc2a4 URL</label><textarea name="v_ref"></textarea>
        <label>\uae08\uc9c0 \ucf58\ud150\uce20 <span class="req">*</span></label><textarea name="v_ban" data-team-required="content"></textarea>
      </motion>
      <motion class="card section-team" data-team="styling">
        <h2>\uc2a4\ud0c0\uc77c\ub9c1 \u00b7 \ud328\uc158</h2>
        <label>\uc2a4\ud0c0\uc77c \ud0a4\uc6cc\ub4dc <span class="req">*</span></label><input name="t_keyword" data-team-required="styling">
        <label>\ud611\ucc2c\u00b7\ud76c\ub9dd \ube0c\ub79c\ub4dc <span class="req">*</span></label><textarea name="t_brands" data-team-required="styling"></textarea>
        <label>\ud328\uc158\uc704\ud06c\u00b7\ub808\ub4dc\uce74\ud3ab</label><textarea name="t_events"></textarea>
        <label>\ub808\ud37c\ub7f0\uc2a4 \ub9c1\ud06c</label><input type="url" name="t_link">
      </motion>
      <motion class="card section-team" data-team="production">
        <h2>\uc791\ud488 \ud64d\ubcf4</h2>
        <label>\uc791\ud488 1 \u2014 \uac1c\uc694\u00b7\uc77c\uc815 <span class="req">*</span></label><textarea name="d_work1" data-team-required="production"></textarea>
        <label>\uc791\ud488 1 \u2014 \ub9c8\ucf00\ud305 \ud5c8\uc6a9 \ubc94\uc704 <span class="req">*</span></label><textarea name="d_allow" data-team-required="production"></textarea>
        <label>\uc791\ud488 2\u00b73</label><textarea name="d_work23"></textarea>
        <label>PPL\u00b7\ud574\uc678 \ud64d\ubcf4</label><textarea name="d_global"></textarea>
      </motion>
      <motion class="card section-always">
        <h2>\ub9c8\ubb34\ub9ac</h2>
        <label>PT\uc5d0 \ubc18\ub4dc\uc2dc \ubc18\uc601\ud560 \uc694\uccad</label><textarea name="final_request"></textarea>
        <label>\ucd94\uac00 \ucf54\uba58\ud2b8 / \ubbf8\ud305 \uac00\ub2a5 \uc77c\uc815</label><textarea name="final_comment"></textarea>
      </motion>
    </form>
    <footer>&copy; ECHO GLOBAL GROUP</footer>
  </motion>
  <motion class="sticky-bar">
    <button type="button" class="btn btn-secondary" onclick="previewText()">\ubbf8\ub9ac\ubcf4\uae30</button>
    <button type="button" class="btn btn-primary" onclick="submitForm()">\uc81c\ucd9c \u00b7 \ud30c\uc77c \uc800\uc7a5</button>
  </motion>
  <motion class="modal" id="modal">
    <motion class="modal-box">
      <h3>\uc791\uc131 \uc644\ub8cc</h3>
      <p style="font-size:0.9rem;color:var(--muted)">\uc544\ub798 \ub0b4\uc6a9\uc744 \ubcf5\uc0ac\ud558\uac70\ub098 TXT\ub85c \uc800\uc7a5\ud558\uc138\uc694.</p>
      <pre id="outputPre"></pre>
      <motion class="modal-actions">
        <button type="button" class="btn btn-primary" onclick="copyOutput()">\ubcf5\uc0ac\ud558\uae30</button>
        <button type="button" class="btn btn-secondary" onclick="downloadTxt()">TXT \ub2e4\uc6b4\ub85c\ub4dc</button>
        <button type="button" class="btn btn-secondary" onclick="closeModal()">\ub2eb\ub2e4</button>
      </motion>
    </motion>
  </motion>
  <script src="form.js" charset="UTF-8"></script>
</body>
</html>"""

old_tag = "motion"
html = html.replace("<" + old_tag, "<div").replace("</" + old_tag + ">", "</div>")

out.write_text(html, encoding="utf-8-sig")
print("Wrote", out)old_tag = "motion"
html = html.replace("<" + old_tag, "<div").replace("</" + old_tag + ">", "</div>")


