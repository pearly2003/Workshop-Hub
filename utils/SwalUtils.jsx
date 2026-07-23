import Swal from "sweetalert2";

/* ─────────────────────────────────────────────
   Global CSS injected once for smooth transitions
   ───────────────────────────────────────────── */
(function injectStyles() {
  if (document.getElementById("__swal-smooth-styles")) return;
  const style = document.createElement("style");
  style.id = "__swal-smooth-styles";
  style.textContent = `
    /* ── Overlay ── */
    .swal2-backdrop-show {
      animation: swalFadeIn 0.22s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
    }
    .swal2-backdrop-hide {
      animation: swalFadeOut 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
    }
    @keyframes swalFadeIn  { from { opacity: 0; } to { opacity: 1; } }
    @keyframes swalFadeOut { from { opacity: 1; } to { opacity: 0; } }

    /* ── Popup enter ── */
    .swal2-show {
      animation: swalSlideIn 0.3s cubic-bezier(0.34, 1.28, 0.64, 1) forwards !important;
    }
    /* ── Popup exit ── */
    .swal2-hide {
      animation: swalSlideOut 0.22s cubic-bezier(0.4, 0, 1, 1) forwards !important;
    }
    @keyframes swalSlideIn {
      from { opacity: 0; transform: translateY(20px) scale(0.96); }
      to   { opacity: 1; transform: translateY(0)    scale(1);    }
    }
    @keyframes swalSlideOut {
      from { opacity: 1; transform: translateY(0)   scale(1);    }
      to   { opacity: 0; transform: translateY(12px) scale(0.97); }
    }

    /* ── Backdrop blur ── */
    .swal2-container {
      backdrop-filter: blur(3px) !important;
      -webkit-backdrop-filter: blur(3px) !important;
    }

    /* ── Button micro-interactions ── */
    .swal2-confirm, .swal2-cancel {
      transition: filter 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease !important;
    }
    .swal2-confirm:hover { filter: brightness(0.91) !important; }
    .swal2-cancel:hover  { filter: brightness(0.93) !important; }
    .swal2-confirm:active,
    .swal2-cancel:active  { transform: scale(0.97) !important; }

    /* ── Timer bar ── */
    .swal2-timer-progress-bar {
      background: currentColor !important;
      height: 3px !important;
    }

    /* ── Textarea ── */
    #swal-textarea {
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    #swal-textarea:focus {
      border-color: #93C5FD !important;
      box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.25) !important;
      outline: none !important;
    }

    /* ── Validation message ── */
    .swal2-validation-message {
      animation: swalValidationIn 0.18s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
    }
    @keyframes swalValidationIn {
      from { opacity: 0; transform: translateY(-4px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── Mobile responsive: enforce proper popup width ── */
    @media (max-width: 640px) {
      .swal2-popup {
        width: 88vw !important;
        min-width: 280px !important;
        max-width: 400px !important;
      }
      .swal2-popup .swal2-html-container {
        word-break: normal !important;
        overflow-wrap: break-word !important;
      }
    }
  `;
  document.head.appendChild(style);
})();

/* ─────────────────────────────────────────────
   Base Swal options
   ───────────────────────────────────────────── */
const baseOptions = {
  width: "min(90vw, 420px)",
  padding: "0",
  showConfirmButton: true,
  allowOutsideClick: false,
  showClass: {
    popup: "swal2-show",
    backdrop: "swal2-backdrop-show",
  },
  hideClass: {
    popup: "swal2-hide",
    backdrop: "swal2-backdrop-hide",
  },
};

/* ─────────────────────────────────────────────
   Icon registry
   ───────────────────────────────────────────── */
const ICONS = {
  question: {
    bg: "#EFF6FF",
    border: "#DBEAFE",
    iconBg: "#DBEAFE",
    confirmColor: "#2563EB",
    svg: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="8" stroke="#2563EB" stroke-width="1.5"/>
      <text x="9" y="13.5" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#2563EB" font-weight="600">?</text>
    </svg>`,
  },
  success: {
    bg: "#F0FDF4",
    border: "#DCFCE7",
    iconBg: "#DCFCE7",
    confirmColor: "#16A34A",
    svg: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="8" stroke="#16A34A" stroke-width="1.5"/>
      <polyline points="5,9.5 7.5,12 13,6" stroke="#16A34A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
  error: {
    bg: "#FFF1F2",
    border: "#FFE4E6",
    iconBg: "#FFE4E6",
    confirmColor: "#DC2626",
    svg: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="8" stroke="#DC2626" stroke-width="1.5"/>
      <line x1="6" y1="6" x2="12" y2="12" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="12" y1="6" x2="6" y2="12" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
  },
  warning: {
    bg: "#FFFBEB",
    border: "#FEF3C7",
    iconBg: "#FEF3C7",
    confirmColor: "#D97706",
    svg: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 2L16 15H2L9 2Z" stroke="#D97706" stroke-width="1.5" stroke-linejoin="round"/>
      <line x1="9" y1="7.5" x2="9" y2="11" stroke="#D97706" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="9" cy="13" r="0.9" fill="#D97706"/>
    </svg>`,
  },
  info: {
    bg: "#EFF6FF",
    border: "#DBEAFE",
    iconBg: "#DBEAFE",
    confirmColor: "#2563EB",
    svg: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="8" stroke="#2563EB" stroke-width="1.5"/>
      <line x1="9" y1="8" x2="9" y2="13" stroke="#2563EB" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="9" cy="5.5" r="0.9" fill="#2563EB"/>
    </svg>`,
  },
};

/* ─────────────────────────────────────────────
   Shared helpers
   ───────────────────────────────────────────── */
const getHeader = (title, iconType) => {
  const s = ICONS[iconType] || ICONS.question;
  return `
    <div style="
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      background: ${s.bg};
      border-bottom: 1px solid ${s.border};
      border-radius: 14px 14px 0 0;
    ">
      <div style="
        width: 36px; height: 36px; flex-shrink: 0;
        border-radius: 50%;
        background: ${s.iconBg};
        display: flex; align-items: center; justify-content: center;
      ">${s.svg}</div>
      <span style="font-size: 14px; font-weight: 600; color: #111827; line-height: 1.3;">
        ${title}
      </span>
    </div>
  `;
};

const sharedCustomClass = (extra = {}) => ({
  popup:
    "rounded-[14px] overflow-hidden border border-gray-100 shadow-2xl",
  actions:
    "flex justify-end w-full px-5 py-3 bg-gray-50 border-t border-gray-100 m-0 mb-6 gap-2",
  confirmButton:
    "px-5 py-[7px] text-xs font-medium rounded-lg transition-all mb-6 shadow-sm",
  cancelButton:
    "px-5 py-[7px] text-xs font-medium rounded-lg border border-gray-200 mb-6 bg-white text-gray-600 hover:bg-gray-50 transition-all",
  validationMessage:
    "text-red-500 text-xs px-5 pb-1 bg-gray-50 text-left",
  ...extra,
});

/* ─────────────────────────────────────────────
   Exports
   ───────────────────────────────────────────── */

/**
 * showConfirm
 * A confirmation dialog, optionally with a required textarea.
 *
 * @param {object} options
 * @param {string}  options.title
 * @param {string}  options.text
 * @param {"question"|"warning"|"info"|"error"|"success"} [options.icon="question"]
 * @param {"textarea"|null} [options.input=null]
 * @param {string}  [options.placeholder=""]
 * @param {string}  [options.confirmText="Confirm"]
 * @param {string}  [options.cancelText="Cancel"]
 * @returns {Promise<SweetAlertResult>}
 */
export const showConfirm = async ({
  title,
  text,
  icon = "question",
  input = null,
  placeholder = "",
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  const s = ICONS[icon] || ICONS.question;

  return Swal.fire({
    ...baseOptions,
    html: `
      ${getHeader(title, icon)}
      <div style="padding: 16px 20px 20px; text-align: left;">
        <p style="font-size: 13px; color: #374151; line-height: 1.65; margin: 0;">
          ${text}
        </p>
        ${input === "textarea"
        ? `<textarea
                id="swal-textarea"
                rows="3"
                placeholder="${placeholder}"
                style="
                  width: 100%; margin-top: 12px;
                  padding: 8px 12px;
                  font-size: 13px; font-family: inherit;
                  border: 1px solid #E5E7EB; border-radius: 8px;
                  background: #F9FAFB; color: #111827;
                  resize: none; outline: none;
                  box-sizing: border-box;
                "
              ></textarea>`
        : ""
      }
      </div>
    `,
    preConfirm: () => {
      if (input === "textarea") {
        const val = document.getElementById("swal-textarea")?.value ?? "";
        if (!val.trim()) {
          Swal.showValidationMessage("Please enter a reason before continuing.");
          return false;
        }
        return val;
      }
    },
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: s.confirmColor,
    cancelButtonColor: "#6B7280",
    customClass: sharedCustomClass(),
    buttonsStyling: false,
  });
};

/**
 * showSuccess
 * An auto-dismissing success toast with a timer bar.
 *
 * @param {string} title
 * @param {string} text
 * @param {number} [timer=2500]  Duration in ms before auto-close.
 * @returns {Promise<SweetAlertResult>}
 */
export const showSuccess = (title, text, timer = 2500) => {
  return Swal.fire({
    ...baseOptions,
    html: `
      ${getHeader(title, "success")}
      <div style="padding: 16px 20px 20px; text-align: left;">
        <p style="font-size: 13px; color: #374151; line-height: 1.65; margin: 0;">
          ${text}
        </p>
      </div>
    `,
    timer,
    timerProgressBar: true,
    showConfirmButton: false,
    customClass: {
      popup: "rounded-[14px] overflow-hidden border border-gray-100 shadow-2xl",
      timerProgressBar: "bg-green-500",
    },
  });
};

/**
 * showError
 * A blocking error dialog with a Close button.
 *
 * @param {string} title
 * @param {string} text
 * @returns {Promise<SweetAlertResult>}
 */
export const showError = (title, text) => {
  const s = ICONS.error;

  return Swal.fire({
    ...baseOptions,
    html: `
      ${getHeader(title, "error")}
      <div style="padding: 16px 20px 20px; text-align: left;">
        <p style="font-size: 13px; color: #374151; line-height: 1.65; margin: 0;">
          ${text}
        </p>
      </div>
    `,
    confirmButtonText: "Close",
    confirmButtonColor: s.confirmColor,
    customClass: sharedCustomClass(),
    buttonsStyling: false,
  });
};

/**
 * showWarning
 * A warning dialog that requires explicit confirmation or cancellation.
 *
 * @param {string} title
 * @param {string} text
 * @param {string} [confirmText="Confirm"]
 * @param {string} [cancelText="Cancel"]
 * @returns {Promise<SweetAlertResult>}
 */
export const showWarning = (
  title,
  text,
  confirmText = "Confirm",
  cancelText = "Cancel",
) => {
  const s = ICONS.warning;

  return Swal.fire({
    ...baseOptions,
    html: `
      ${getHeader(title, "warning")}
      <div style="padding: 16px 20px 20px; text-align: left;">
        <p style="font-size: 13px; color: #374151; line-height: 1.65; margin: 0;">
          ${text}
        </p>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: s.confirmColor,
    cancelButtonColor: "#6B7280",
    customClass: sharedCustomClass(),
    buttonsStyling: false,
  });
};

/**
 * showInfo
 * An informational dialog with a single acknowledgement button.
 *
 * @param {string} title
 * @param {string} text
 * @returns {Promise<SweetAlertResult>}
 */
export const showInfo = (title, text) => {
  const s = ICONS.info;

  return Swal.fire({
    ...baseOptions,
    html: `
      ${getHeader(title, "info")}
      <div style="padding: 16px 20px 20px; text-align: left;">
        <p style="font-size: 13px; color: #374151; line-height: 1.65; margin: 0;">
          ${text}
        </p>
      </div>
    `,
    confirmButtonText: "Got it",
    confirmButtonColor: s.confirmColor,
    customClass: sharedCustomClass(),
    buttonsStyling: false,
  });
};

