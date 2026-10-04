/**
 * آیکون نشانگر قبر — SVG طلایی
 * با L.divIcon ساخته می‌شود تا نیازی به فایل جدا نباشد.
 */
import L from 'leaflet';

export function createGraveMarker(): L.DivIcon {
  const html = `
    <div style="
      position: relative;
      width: 40px;
      height: 52px;
      filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5));
    ">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 52" style="width:100%;height:100%;">
        <path d="M20 0 C9 0 0 9 0 20 C0 34 20 52 20 52 C20 52 40 34 40 20 C40 9 31 0 20 0 Z"
              fill="#B8915A" stroke="#8C6D3F" stroke-width="1.5"/>
        <circle cx="20" cy="20" r="7" fill="#0B0B0C"/>
        <circle cx="20" cy="20" r="3" fill="#F5EFE0"/>
      </svg>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'grave-marker',
    iconSize: [40, 52],
    iconAnchor: [20, 52],
    popupAnchor: [0, -52],
  });
}

/**
 * آیکون موقعیت کاربر — دایره آبی با انیمیشن پالس
 */
export function createUserMarker(): L.DivIcon {
  const html = `
    <div style="position: relative; width: 24px; height: 24px;">
      <span style="
        position: absolute; inset: 0;
        border-radius: 50%;
        background: #4A9EFF;
        opacity: 0.3;
        animation: user-pulse 2s ease-out infinite;
      "></span>
      <span style="
        position: absolute; inset: 4px;
        border-radius: 50%;
        background: #4A9EFF;
        border: 2px solid #fff;
        box-shadow: 0 2px 6px rgba(0,0,0,0.4);
      "></span>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'user-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}