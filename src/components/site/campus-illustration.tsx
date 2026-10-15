export function CampusIllustration() {
  return (
    <svg
      className="campus-illustration"
      viewBox="0 0 600 530"
      role="img"
      aria-labelledby="campus-title"
      aria-describedby="campus-description"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="campus-title">加拿大校园与山景插画</title>
      <desc id="campus-description">蓝色山峦、校园建筑与枫树之间，一条小路通向新的起点。</desc>
      <defs>
        <linearGradient id="campus-sky" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#D9EAF8" /><stop offset="1" stopColor="#F3F8FC" />
        </linearGradient>
        <linearGradient id="campus-water" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#B7D5E9" /><stop offset="1" stopColor="#E0EDF5" />
        </linearGradient>
      </defs>
      <path d="M40 490V270a260 260 0 0 1 520 0v220H40Z" fill="url(#campus-sky)" />
      <circle cx="432" cy="117" r="38" fill="#FFF9EA" />
      <g fill="white" opacity=".85">
        <path d="M76 157c3-13 14-19 25-13 4-17 31-20 37-2 17-4 28 4 29 15H76Z" />
        <path d="M317 192c2-11 13-18 24-12 5-18 30-17 35 1 15-3 27 2 29 11h-88Z" />
      </g>
      <path d="m40 304 111-130 107 130 81-106 108 110 55-73 58 67v138H40Z" fill="#B8CFE2" />
      <path d="m114 217 37-43 36 44-21-8-15 13-14-16-23 10Zm199 13 26-32 35 36-22-8-13 10-14-13-12 7Z" fill="#F3F8FC" />
      <path d="M40 339c101-79 169-16 244-26 89-13 173-57 276 13v164H40Z" fill="#7EABC3" />
      <path d="M40 384c112-49 170-35 255 12 77 42 175-61 265-15v109H40Z" fill="url(#campus-water)" />
      <path d="M20 459c100-41 177-59 280-40 97 18 181 11 280-17v105H20Z" fill="#D5E1D8" />
      <path d="M187 530c29-49 38-66 74-86 26-15 67-19 91-49" fill="none" stroke="#F8F4E9" strokeWidth="50" />
      <g stroke="#244B73" strokeWidth="2" strokeLinejoin="round">
        <path d="M235 294h192v130H235Z" fill="#FAF8F1" />
        <path d="m224 294 43-37h131l40 37H224Z" fill="#4C6E8E" />
        <path d="M295 247h71v177h-71Z" fill="#FFFDF7" />
        <path d="m287 247 44-43 43 43h-87Z" fill="#2D527A" />
        <path d="M322 191h18v25h-18Z" fill="#FFFDF7" />
        <path d="m318 191 13-18 14 18h-27Z" fill="#2D527A" />
        <path d="M316 424v-39a15 15 0 0 1 30 0v39" fill="#456987" />
        <path d="M249 316h13v23h-13Zm27 0h10v23h-10Zm107 0h13v23h-13Zm27 0h10v23h-10ZM249 362h13v23h-13Zm27 0h10v23h-10Zm107 0h13v23h-13Zm27 0h10v23h-10Z" fill="#A8C6DB" strokeWidth="1.5" />
      </g>
      <circle cx="331" cy="279" r="13" fill="#F4F0E3" stroke="#244B73" strokeWidth="2" />
      <path d="M331 271v8l6 3" fill="none" stroke="#244B73" strokeWidth="2" strokeLinecap="round" />
      <path d="M305 320h12v24h-12Zm40 0h12v24h-12Z" fill="#A8C6DB" />
      <g fill="#406B6C">
        <path d="m88 300-31 64h16l-22 39h31v37h12v-37h30l-22-39h16l-30-64Z" />
        <path d="m496 290-28 61h14l-20 40h28v37h11v-37h29l-21-40h15l-28-61Z" />
      </g>
      <g stroke="#79574B" strokeWidth="4" strokeLinecap="round">
        <path d="M147 463V343m0 59-24-25m24 8 22-25" />
      </g>
      <g fill="#C78769">
        <circle cx="127" cy="340" r="27" /><circle cx="164" cy="332" r="31" />
        <circle cx="145" cy="307" r="27" /><circle cx="145" cy="361" r="32" />
      </g>
      <path d="M147 405v-70m0 33-13-13m13 29 16-18" fill="none" stroke="#966B56" strokeWidth="3" strokeLinecap="round" />
      <path d="M454 462v-46m0 20-12-11m12 24 14-12" fill="none" stroke="#79574B" strokeWidth="3" strokeLinecap="round" />
      <g fill="#CDA27D"><circle cx="441" cy="408" r="19" /><circle cx="467" cy="404" r="21" /><circle cx="455" cy="388" r="20" /></g>
      <g stroke="#9FBCCD" strokeWidth="2" strokeLinecap="round"><path d="M67 421h38m340-26h25M193 389h21M375 452h32" /></g>
      <path d="m506 151 11 4-5 7m5-7-24 12" fill="none" stroke="#6D93AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
