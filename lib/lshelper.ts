import LsCache from './cache.ts'

/**
 * utf16 编码字符串占用字节数
 * @param str
 * @returns
 * - 基本多语言平面（BMP，编码范围 U+0000 ~ U+FFFF）字符占用 2 个字节
 * - 非 BMP 字符占用 4 个字节
 */
function sizeofUtf16Bytes(str: string) {
  let bytes = 0;
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);

    if (charCode <= 0xffff) {
      bytes += 2;
    } else {
      bytes += 4;
    }
  }

  return bytes;
}

const KbCell: string = new Array(1024).fill('-').join('');
const KbCellx64: string = new Array(64).fill(KbCell).join('');
const Key = 't'

type SateResult = {
  total: number;
  free: number;
  used: number;
  usedKey: number;
  usedContent: number;
}

/**
 * 计算 Local Storage 最大存储字节数
 * @returns 
 * - Local Storage 以 UTF-16 编码存储 https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage#description
 * - 键和值都会计入 Local Storage 占用
 */
export function size() {
  let bytes = 0;
  // 首次减去存储键的字符占用
  let content = KbCellx64.slice(Key.length);
  
  function appendLocal() {
    try {
      content += KbCellx64;
      localStorage.setItem(Key, content);
      appendLocal();
    } catch (error) {
      localStorage.removeItem(Key);

      bytes = sizeofUtf16Bytes(content.slice(KbCellx64.length) + Key);
      console.log(`Local storage overflow, max size: ${bytes / 1024 / 1024}Mb`);
    }
  }

  const lsCache = new LsCache()
  lsCache.saveAndClear()
  appendLocal();
  lsCache.restore()
  return bytes;
}

/**
 * 计算当前 Local Storage 中存储的字节数
 * @returns 
 */
export function curSize() {
  let bytes = 0;

  Object.keys(localStorage).forEach(key => {
    bytes += sizeofUtf16Bytes(key)
    bytes += sizeofUtf16Bytes(localStorage.getItem(key) || '');
  })

  return bytes;
}

/**
 * 返回当前 Local Storage 的状态
 */
export function stat(): SateResult {
  let total: number = size();
  let used: number = curSize();
  let free: number = total - used;
  let usedKey: number = 0;
  let usedContent: number = 0;

  Object.keys(localStorage).forEach(key => {
    usedKey += sizeofUtf16Bytes(key) 
    usedContent += sizeofUtf16Bytes(localStorage.getItem(key) || '') 
  })

  return {
    total, used, free, usedKey, usedContent
  }
}
