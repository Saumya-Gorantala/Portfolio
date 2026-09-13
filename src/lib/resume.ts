export const RESUME_FILENAME = 'SaumyaGorantala_Resume.pdf';

export const RESUME_PDF_URL =
  'https://raw.githubusercontent.com/Saumya-Gorantala/Portfolio/main/Resume/SaumyaGorantala_Resume.pdf';

export async function downloadResume() {
  try {
    const response = await fetch(RESUME_PDF_URL);
    if (!response.ok) {
      throw new Error(`Resume request failed (${response.status})`);
    }

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = RESUME_FILENAME;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  } catch {
    window.location.assign(RESUME_PDF_URL);
  }
}
