class Validation {
  static validateEmail(email: string) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  static validatePassword(password: string) {
    return password.length >= 4 && password.length <= 8;
  }

  static async processFile(file: string): Promise<string | undefined> {
    let error;
    const matches = file.match(/^data:(.*?);base64,(.*)$/)!;

    const mimeType = matches[1];

    if (!this.isValidFileType(mimeType)) {
      error = "Invalid file format";
    }

    const base64Data = matches[2];
    const rawData = atob(base64Data);
    const fileSizeBytes = rawData.length;

    if (mimeType === "text/plain" && fileSizeBytes > 100 * 1024) {
      error = "Text file size exceeds the limit of 100 KB";
    }

    return error;
  }

  private static isValidFileType(mimeType: string) {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "text/plain"];
    return allowedTypes.includes(mimeType);
  }
}

export default Validation;
