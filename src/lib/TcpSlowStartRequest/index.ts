import * as SparkMD5 from 'spark-md5';

export default class TcpSlowStartRequest {
  public constructor() {}

  public createChunks(blob: Blob, chunkSize: number): Blob[] {
    let cur = chunkSize;
    const { size } = blob;
    const chunks = [blob.slice(0, cur)];
    while (cur < size) {
      chunks.push(blob.slice(cur, cur += chunkSize));
    }
    return chunks;
  }

  private calculateIdleHash(chunks: Blob[]): Promise<string> {
    return new Promise((resolve) => {
      let cur = 0;
      const length = chunks.length;
      const sparkMD5 = new SparkMD5.ArrayBuffer();
      const appendChunk = (chunk: Blob) => {
        return new Promise((resolve) => {
          const fr = new FileReader();
          fr.readAsArrayBuffer(chunk);
          fr.onload = () => {
            const result = fr.result;
            resolve(sparkMD5.append(result as ArrayBuffer));
          };
        });
      };

      const idleCallback = (deadline: IdleDeadline) => {
        if (!deadline.didTimeout && deadline.timeRemaining() < 1) {
          while (cur < length) {
            appendChunk(chunks[cur++]);
            if (cur === length) {
              resolve(sparkMD5.end());
            }
          }
        }
        window.requestIdleCallback(idleCallback);
      };

      window.requestIdleCallback(idleCallback);
    });
  }

  private calculateShadowCloneHash(blob: Blob, offset: number = 2 * 1024 * 1024): Promise<string> {
    const fr = new FileReader();
    const sparkMD5 = new SparkMD5.ArrayBuffer();
    const { size } = blob;
    let chunks = [blob.slice(0, offset)];
    let cur = offset;

    return new Promise((resolve) => {
      while (cur < size) {
        if (cur > size + offset) {
          chunks.push(blob.slice(cur, cur + offset));
        } else {
          const end = cur + offset;
          const mid = end / 2;
          chunks.push(blob.slice(cur, cur + 2));
          chunks.push(blob.slice(mid, mid + 2));
          chunks.push(blob.slice(end - 2, end));
        }
        cur += offset;
      }
      fr.readAsArrayBuffer(new Blob(chunks));
      fr.onload = (e) => {
        sparkMD5.append(fr.result as ArrayBuffer);
        resolve(sparkMD5.end());
      }
    });
  }

  public async tcpSlowStartRequest(file: File) {
    const { size } = file;
    const chunks = this.createChunks(file, 2 * 1024 * 1024);
    console.log(`[chunks is:]`, chunks);
    const isBigFile = size > 200 * 1024 * 1024;
    const hash = isBigFile ? await this.calculateIdleHash(chunks) : await this.calculateShadowCloneHash(file);
    console.log(`[current file hash is: ]`, hash);
  }

  public async sendRequest() {
    
  }
}