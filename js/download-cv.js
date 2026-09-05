/* ══════════════════════════════════════════════════════════════
   PORTFOLIO — download-cv.js
   Every "Download Resume / CV" button generates a SINGLE-PAGE A4
   PDF from the hidden #cv-print section (index.html) using
   html2canvas + jsPDF (loaded from CDN).

   ✏️ To change what the PDF contains, edit the #cv-print block
      in index.html — no need to touch this file.
   ══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // All resume-download links end with the resume path
  var resumeLinks = document.querySelectorAll('a[href*="assets/resume/"]');
  if (!resumeLinks.length) return;

  resumeLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      generateCV(link);
    });
  });

  async function generateCV(link) {
    // 1. Make sure the PDF libraries actually loaded
    if (typeof html2canvas === 'undefined' || !window.jspdf || !window.jspdf.jsPDF) {
      alert('PDF engine not loaded yet.\n\nMake sure you have an internet connection, then click again. (html2canvas + jsPDF come from a CDN.)');
      return;
    }

    var cv = document.getElementById('cv-print');
    if (!cv) {
      alert('CV section not found. Please check the #cv-print block in index.html.');
      return;
    }

    // Give the user a tiny "working" state on the button
    var originalText = link.textContent;
    link.textContent = 'Generating PDF…';

    try {
      // 2. Shrink the content step by step until it fits exactly ONE A4 page.
      //    A4 ratio = 297/210. We keep the element's width and watch its height.
      var targetH = Math.round(cv.offsetWidth * (297 / 210));
      var level = 0;
      while (cv.scrollHeight > targetH + 6 && level < 6) {
        level++;
        cv.setAttribute('data-shrink', String(level));
      }

      // 3. Render the hidden CV to a crisp canvas
      var canvas = await html2canvas(cv, {
        scale: 2,                 // 2x = sharp text in the PDF
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: cv.offsetWidth
      });

      // 4. Build the PDF; fit the image to a single A4 page (centered).
      var jspdf = window.jspdf.jsPDF;
      var pdf = new jspdf({ orientation: 'portrait', unit: 'pt', format: 'a4' });
      var pageW = pdf.internal.pageSize.getWidth();   // 595.28
      var pageH = pdf.internal.pageSize.getHeight();  // 841.89
      var imgW = canvas.width;
      var imgH = canvas.height;
      var scale = Math.min(pageW / imgW, pageH / imgH);
      var drawW = imgW * scale;
      var drawH = imgH * scale;
      var x = (pageW - drawW) / 2;
      var y = (pageH - drawH) / 2;

      pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', x, y, drawW, drawH, undefined, 'FAST');

      // 5. Trigger download as a single-page PDF
      pdf.save('Krishna_Resume.pdf');
    } catch (err) {
      console.error('CV PDF generation failed:', err);
      alert('Sorry, the PDF could not be generated. Please try again.');
    } finally {
      // 6. Always restore the original size/unshrunk content
      cv.removeAttribute('data-shrink');
      link.textContent = originalText;
    }
  }
})();