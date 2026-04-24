(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/lib/utils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "cn": (()=>cn),
    "decodeRepeated": (()=>decodeRepeated),
    "encodeRepeated": (()=>encodeRepeated),
    "formatPercent": (()=>formatPercent)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function encodeRepeated(stickerIds) {
    return btoa(stickerIds.join(','));
}
function decodeRepeated(encoded) {
    try {
        return atob(encoded).split(',').filter(Boolean);
    } catch  {
        return [];
    }
}
function formatPercent(value) {
    return `${Math.round(value)}%`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/layout/BottomNav.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>BottomNav)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column.js [app-client] (ecmascript) <export default as BarChart2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left-right.js [app-client] (ecmascript) <export default as ArrowLeftRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const TABS = [
    {
        href: '/album',
        label: 'Álbum',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"]
    },
    {
        href: '/stats',
        label: 'Stats',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart2$3e$__["BarChart2"]
    },
    {
        href: '/stats-avanzadas',
        label: 'Análisis',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"]
    },
    {
        href: '/intercambios',
        label: 'Cambios',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftRight$3e$__["ArrowLeftRight"]
    },
    {
        href: '/perfil',
        label: 'Perfil',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"]
    }
];
function BottomNav() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-brand-border shadow-[0_-1px_12px_rgba(13,15,26,0.08)]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-stretch h-16 max-w-lg mx-auto",
            children: TABS.map(({ href, label, icon: Icon })=>{
                const active = pathname === href;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: href,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col items-center justify-center flex-1 gap-0.5 transition-all duration-150', active ? 'text-brand-red' : 'text-brand-faint'),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative p-1.5 rounded-xl transition-all', active && 'bg-brand-red-light'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                    size: 20,
                                    strokeWidth: active ? 2.5 : 1.8
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/BottomNav.tsx",
                                    lineNumber: 37,
                                    columnNumber: 17
                                }, this),
                                active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-red"
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/BottomNav.tsx",
                                    lineNumber: 39,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/BottomNav.tsx",
                            lineNumber: 33,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-[10px] font-semibold leading-none', active ? 'text-brand-red' : 'text-brand-faint'),
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/components/layout/BottomNav.tsx",
                            lineNumber: 42,
                            columnNumber: 15
                        }, this)
                    ]
                }, href, true, {
                    fileName: "[project]/components/layout/BottomNav.tsx",
                    lineNumber: 25,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/components/layout/BottomNav.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/layout/BottomNav.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(BottomNav, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = BottomNav;
var _c;
__turbopack_context__.k.register(_c, "BottomNav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/data/stickers.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ALL_STICKERS": (()=>ALL_STICKERS),
    "GROUPS": (()=>GROUPS),
    "TEAMS": (()=>TEAMS),
    "TOTAL_STICKERS": (()=>TOTAL_STICKERS),
    "getStickerById": (()=>getStickerById),
    "getStickersByTeam": (()=>getStickersByTeam),
    "getTeamsByGroup": (()=>getTeamsByGroup)
});
const TEAMS = [
    // Grupo A
    {
        code: 'MEX',
        name: 'México',
        group: 'A',
        flag: '🇲🇽'
    },
    {
        code: 'KOR',
        name: 'Corea del Sur',
        group: 'A',
        flag: '🇰🇷'
    },
    {
        code: 'ZAF',
        name: 'Sudáfrica',
        group: 'A',
        flag: '🇿🇦'
    },
    {
        code: 'CZE',
        name: 'Rep. Checa',
        group: 'A',
        flag: '🇨🇿'
    },
    // Grupo B
    {
        code: 'CAN',
        name: 'Canadá',
        group: 'B',
        flag: '🇨🇦'
    },
    {
        code: 'SUI',
        name: 'Suiza',
        group: 'B',
        flag: '🇨🇭'
    },
    {
        code: 'QAT',
        name: 'Catar',
        group: 'B',
        flag: '🇶🇦'
    },
    {
        code: 'BIH',
        name: 'Bosnia y Herz.',
        group: 'B',
        flag: '🇧🇦'
    },
    // Grupo C
    {
        code: 'BRA',
        name: 'Brasil',
        group: 'C',
        flag: '🇧🇷'
    },
    {
        code: 'MAR',
        name: 'Marruecos',
        group: 'C',
        flag: '🇲🇦'
    },
    {
        code: 'SCO',
        name: 'Escocia',
        group: 'C',
        flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿'
    },
    {
        code: 'HAI',
        name: 'Haití',
        group: 'C',
        flag: '🇭🇹'
    },
    // Grupo D
    {
        code: 'USA',
        name: 'Estados Unidos',
        group: 'D',
        flag: '🇺🇸'
    },
    {
        code: 'AUS',
        name: 'Australia',
        group: 'D',
        flag: '🇦🇺'
    },
    {
        code: 'PAR',
        name: 'Paraguay',
        group: 'D',
        flag: '🇵🇾'
    },
    {
        code: 'TUR',
        name: 'Turquía',
        group: 'D',
        flag: '🇹🇷'
    },
    // Grupo E
    {
        code: 'GER',
        name: 'Alemania',
        group: 'E',
        flag: '🇩🇪'
    },
    {
        code: 'ECU',
        name: 'Ecuador',
        group: 'E',
        flag: '🇪🇨'
    },
    {
        code: 'CIV',
        name: 'Costa de Marfil',
        group: 'E',
        flag: '🇨🇮'
    },
    {
        code: 'CUW',
        name: 'Curazao',
        group: 'E',
        flag: '🇨🇼'
    },
    // Grupo F
    {
        code: 'NED',
        name: 'Países Bajos',
        group: 'F',
        flag: '🇳🇱'
    },
    {
        code: 'JPN',
        name: 'Japón',
        group: 'F',
        flag: '🇯🇵'
    },
    {
        code: 'TUN',
        name: 'Túnez',
        group: 'F',
        flag: '🇹🇳'
    },
    {
        code: 'SWE',
        name: 'Suecia',
        group: 'F',
        flag: '🇸🇪'
    },
    // Grupo G
    {
        code: 'BEL',
        name: 'Bélgica',
        group: 'G',
        flag: '🇧🇪'
    },
    {
        code: 'IRN',
        name: 'Irán',
        group: 'G',
        flag: '🇮🇷'
    },
    {
        code: 'EGY',
        name: 'Egipto',
        group: 'G',
        flag: '🇪🇬'
    },
    {
        code: 'NZL',
        name: 'Nueva Zelanda',
        group: 'G',
        flag: '🇳🇿'
    },
    // Grupo H
    {
        code: 'CPV',
        name: 'Cabo Verde',
        group: 'H',
        flag: '🇨🇻'
    },
    {
        code: 'KSA',
        name: 'Arabia Saudita',
        group: 'H',
        flag: '🇸🇦'
    },
    {
        code: 'ESP',
        name: 'España',
        group: 'H',
        flag: '🇪🇸'
    },
    {
        code: 'URU',
        name: 'Uruguay',
        group: 'H',
        flag: '🇺🇾'
    },
    // Grupo I
    {
        code: 'FRA',
        name: 'Francia',
        group: 'I',
        flag: '🇫🇷'
    },
    {
        code: 'SEN',
        name: 'Senegal',
        group: 'I',
        flag: '🇸🇳'
    },
    {
        code: 'NOR',
        name: 'Noruega',
        group: 'I',
        flag: '🇳🇴'
    },
    {
        code: 'IRQ',
        name: 'Irak',
        group: 'I',
        flag: '🇮🇶'
    },
    // Grupo J
    {
        code: 'ALG',
        name: 'Argelia',
        group: 'J',
        flag: '🇩🇿'
    },
    {
        code: 'ARG',
        name: 'Argentina',
        group: 'J',
        flag: '🇦🇷'
    },
    {
        code: 'AUT',
        name: 'Austria',
        group: 'J',
        flag: '🇦🇹'
    },
    {
        code: 'JOR',
        name: 'Jordania',
        group: 'J',
        flag: '🇯🇴'
    },
    // Grupo K
    {
        code: 'POR',
        name: 'Portugal',
        group: 'K',
        flag: '🇵🇹'
    },
    {
        code: 'COL',
        name: 'Colombia',
        group: 'K',
        flag: '🇨🇴'
    },
    {
        code: 'UZB',
        name: 'Uzbekistán',
        group: 'K',
        flag: '🇺🇿'
    },
    {
        code: 'COD',
        name: 'R.D. Congo',
        group: 'K',
        flag: '🇨🇩'
    },
    // Grupo L
    {
        code: 'ENG',
        name: 'Inglaterra',
        group: 'L',
        flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿'
    },
    {
        code: 'CRO',
        name: 'Croacia',
        group: 'L',
        flag: '🇭🇷'
    },
    {
        code: 'PAN',
        name: 'Panamá',
        group: 'L',
        flag: '🇵🇦'
    },
    {
        code: 'GHA',
        name: 'Ghana',
        group: 'L',
        flag: '🇬🇭'
    }
];
function generateStickers() {
    const stickers = [];
    stickers.push({
        id: 'FWC-00',
        section: 'FWC',
        sectionLabel: 'Introducción',
        number: '00',
        type: 'foil',
        label: 'FWC 00'
    });
    for(let i = 1; i <= 8; i++){
        stickers.push({
            id: `FWC-${i}`,
            section: 'FWC',
            sectionLabel: 'Introducción',
            number: String(i),
            type: 'special',
            label: `FWC ${i}`
        });
    }
    for (const team of TEAMS){
        if (team.code === 'BEL') {
            for(let i = 1; i <= 12; i++){
                stickers.push({
                    id: `COC-${i}`,
                    section: 'COCA_COLA',
                    sectionLabel: 'Coca-Cola',
                    number: String(i),
                    type: 'special',
                    label: `Coca-Cola ${i}`
                });
            }
        }
        for(let n = 1; n <= 20; n++){
            const isBadge = n === 1;
            const isPhoto = n === 2;
            stickers.push({
                id: `${team.code}-${n}`,
                section: team.code,
                sectionLabel: team.name,
                teamCode: team.code,
                teamName: team.name,
                teamFlag: team.flag,
                group: team.group,
                number: String(n),
                type: isBadge ? 'foil' : 'normal',
                label: isBadge ? `${team.flag} Escudo` : isPhoto ? 'Foto equipo' : `Jugador ${n - 2}`
            });
        }
    }
    for(let i = 9; i <= 13; i++){
        stickers.push({
            id: `FWC-${i}`,
            section: 'FWC_END',
            sectionLabel: 'Cierre',
            number: String(i),
            type: 'special',
            label: `FWC ${i}`
        });
    }
    return stickers;
}
const ALL_STICKERS = generateStickers();
const TOTAL_STICKERS = ALL_STICKERS.length;
const GROUPS = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L'
];
function getTeamsByGroup(group) {
    return TEAMS.filter((t)=>t.group === group);
}
function getStickersByTeam(teamCode) {
    return ALL_STICKERS.filter((s)=>s.teamCode === teamCode);
}
function getStickerById(id) {
    return ALL_STICKERS.find((s)=>s.id === id);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/store.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useStore": (()=>useStore)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$stickers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/stickers.ts [app-client] (ecmascript)");
'use client';
;
;
;
const STATUS_CYCLE = [
    'none',
    'have',
    'repeated'
];
const ACHIEVEMENT_DEFS = [
    {
        id: 'first_sticker',
        title: '¡Primera figurita!',
        description: 'Marcaste tu primera figurita',
        icon: '⭐'
    },
    {
        id: 'first_repeated',
        title: 'Primer repetido',
        description: 'Tu primera figurita repetida',
        icon: '💎'
    },
    {
        id: 'team_complete',
        title: 'País completo',
        description: 'Completaste los 20 stickers de un país',
        icon: '🏆'
    },
    {
        id: 'group_complete',
        title: 'Grupo completo',
        description: 'Completaste todos los países de un grupo',
        icon: '🎯'
    },
    {
        id: 'quarter_album',
        title: '25% completado',
        description: 'Completaste un cuarto del álbum',
        icon: '📖'
    },
    {
        id: 'half_album',
        title: '¡A mitad!',
        description: 'Completaste el 50% del álbum',
        icon: '🌟'
    },
    {
        id: 'three_quarters',
        title: '75% completado',
        description: 'Ya casi terminás',
        icon: '🔥'
    },
    {
        id: 'full_album',
        title: '¡ÁLBUM COMPLETO!',
        description: 'Completaste el álbum entero',
        icon: '🏅'
    },
    {
        id: 'streak_3',
        title: 'En racha x3',
        description: '3 días seguidos en FiguSwap',
        icon: '🔥'
    },
    {
        id: 'streak_7',
        title: 'Racha semanal',
        description: '7 días seguidos en FiguSwap',
        icon: '💪'
    }
];
function checkAndUnlock(id, newStates, prevUnlocked, nextStatus) {
    const toUnlock = [];
    const unlock = (achievementId)=>{
        if (prevUnlocked.has(achievementId)) return;
        const def = ACHIEVEMENT_DEFS.find((a)=>a.id === achievementId);
        if (def) toUnlock.push({
            ...def,
            unlockedAt: new Date().toISOString()
        });
    };
    const ownedCount = Object.values(newStates).filter((s)=>s.status === 'have' || s.status === 'repeated').length;
    if (ownedCount === 1) unlock('first_sticker');
    if (nextStatus === 'repeated') unlock('first_repeated');
    const sticker = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$stickers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_STICKERS"].find((s)=>s.id === id);
    if (sticker?.teamCode) {
        const teamStickers = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$stickers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_STICKERS"].filter((s)=>s.teamCode === sticker.teamCode);
        const teamOwned = teamStickers.filter((s)=>{
            const st = newStates[s.id];
            return st?.status === 'have' || st?.status === 'repeated';
        }).length;
        if (teamOwned === 20) unlock('team_complete');
        const group = sticker.group;
        if (group) {
            const groupTeams = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$stickers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEAMS"].filter((t)=>t.group === group);
            const allGroupDone = groupTeams.every((t)=>{
                return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$stickers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_STICKERS"].filter((s)=>s.teamCode === t.code).every((s)=>{
                    const st = newStates[s.id];
                    return st?.status === 'have' || st?.status === 'repeated';
                });
            });
            if (allGroupDone) unlock('group_complete');
        }
    }
    const total = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$stickers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_STICKERS"].length;
    const pct = ownedCount / total * 100;
    if (pct >= 25) unlock('quarter_album');
    if (pct >= 50) unlock('half_album');
    if (pct >= 75) unlock('three_quarters');
    if (pct >= 100) unlock('full_album');
    return toUnlock;
}
const useStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        stickerStates: {},
        setStickerStatus: (id, status)=>{
            const today = new Date().toISOString().split('T')[0];
            const prevStates = get().stickerStates;
            const newStates = {
                ...prevStates,
                [id]: {
                    status,
                    repeatedCount: status === 'repeated' ? (prevStates[id]?.repeatedCount ?? 0) + 1 : 0,
                    updatedAt: new Date().toISOString()
                }
            };
            const prevUnlocked = new Set(get().achievements.map((a)=>a.id));
            const newAchievements = checkAndUnlock(id, newStates, prevUnlocked, status);
            const owned = Object.values(newStates).filter((s)=>s.status === 'have' || s.status === 'repeated').length;
            set((state)=>{
                const existing = state.dailyProgress.findIndex((d)=>d.date === today);
                const newDaily = [
                    ...state.dailyProgress
                ];
                if (existing >= 0) {
                    newDaily[existing] = {
                        date: today,
                        owned
                    };
                } else {
                    newDaily.push({
                        date: today,
                        owned
                    });
                }
                return {
                    stickerStates: newStates,
                    dailyProgress: newDaily,
                    achievements: newAchievements.length > 0 ? [
                        ...state.achievements,
                        ...newAchievements
                    ] : state.achievements,
                    newAchievement: newAchievements.length > 0 ? newAchievements[0] : state.newAchievement
                };
            });
        },
        cycleStickerStatus: (id)=>{
            const current = get().stickerStates[id]?.status ?? 'none';
            const nextIndex = (STATUS_CYCLE.indexOf(current) + 1) % STATUS_CYCLE.length;
            get().setStickerStatus(id, STATUS_CYCLE[nextIndex]);
        },
        user: null,
        setUser: (user)=>set({
                user
            }),
        achievements: [],
        newAchievement: null,
        clearNewAchievement: ()=>set({
                newAchievement: null
            }),
        streak: 0,
        lastActivity: null,
        updateStreak: ()=>{
            const today = new Date().toDateString();
            const last = get().lastActivity;
            if (last === today) return;
            const yesterday = new Date(Date.now() - 86400000).toDateString();
            const newStreak = last === yesterday ? get().streak + 1 : 1;
            const prevUnlocked = new Set(get().achievements.map((a)=>a.id));
            const toUnlock = [];
            if (newStreak >= 3 && !prevUnlocked.has('streak_3')) {
                const def = ACHIEVEMENT_DEFS.find((a)=>a.id === 'streak_3');
                if (def) toUnlock.push({
                    ...def,
                    unlockedAt: new Date().toISOString()
                });
            }
            if (newStreak >= 7 && !prevUnlocked.has('streak_7')) {
                const def = ACHIEVEMENT_DEFS.find((a)=>a.id === 'streak_7');
                if (def) toUnlock.push({
                    ...def,
                    unlockedAt: new Date().toISOString()
                });
            }
            set((state)=>({
                    streak: newStreak,
                    lastActivity: today,
                    achievements: toUnlock.length > 0 ? [
                        ...state.achievements,
                        ...toUnlock
                    ] : state.achievements,
                    newAchievement: toUnlock.length > 0 ? toUnlock[0] : state.newAchievement
                }));
        },
        dailyProgress: [],
        getOwnedCount: ()=>Object.values(get().stickerStates).filter((s)=>s.status === 'have' || s.status === 'repeated').length,
        getStats: ()=>{
            const states = get().stickerStates;
            const total = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$stickers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_STICKERS"].length;
            let owned = 0;
            let repeated = 0;
            for (const s of __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$stickers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_STICKERS"]){
                const st = states[s.id];
                if (st?.status === 'have') owned++;
                if (st?.status === 'repeated') {
                    owned++;
                    repeated++;
                }
            }
            return {
                owned,
                missing: total - owned,
                repeated,
                percentComplete: Math.round(owned / total * 100)
            };
        },
        getTeamStats: (teamCode)=>{
            const states = get().stickerStates;
            const team = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$stickers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_STICKERS"].filter((s)=>s.teamCode === teamCode);
            const owned = team.filter((s)=>{
                const st = states[s.id];
                return st?.status === 'have' || st?.status === 'repeated';
            }).length;
            return {
                owned,
                total: 20,
                percent: Math.round(owned / 20 * 100)
            };
        },
        getRepeatedStickers: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$stickers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_STICKERS"].filter((s)=>get().stickerStates[s.id]?.status === 'repeated').map((s)=>s.id),
        getMissingStickers: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$stickers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_STICKERS"].filter((s)=>{
                const st = get().stickerStates[s.id];
                return !st || st.status === 'none';
            }).map((s)=>s.id)
    }), {
    name: 'figuswap-v1'
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/ui/AchievementToast.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AchievementToast)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function AchievementToast() {
    _s();
    const achievement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "AchievementToast.useStore[achievement]": (s)=>s.newAchievement
    }["AchievementToast.useStore[achievement]"]);
    const clear = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"])({
        "AchievementToast.useStore[clear]": (s)=>s.clearNewAchievement
    }["AchievementToast.useStore[clear]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AchievementToast.useEffect": ()=>{
            if (!achievement) return;
            const t = setTimeout(clear, 3500);
            return ({
                "AchievementToast.useEffect": ()=>clearTimeout(t)
            })["AchievementToast.useEffect"];
        }
    }["AchievementToast.useEffect"], [
        achievement,
        clear
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: achievement && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                y: -80,
                opacity: 0,
                scale: 0.92
            },
            animate: {
                y: 0,
                opacity: 1,
                scale: 1
            },
            exit: {
                y: -80,
                opacity: 0,
                scale: 0.92
            },
            transition: {
                type: 'spring',
                stiffness: 380,
                damping: 26
            },
            className: "fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-sm",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border border-brand-border rounded-2xl p-4 shadow-card-md flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-12 h-12 rounded-xl bg-brand-gold-light flex items-center justify-center text-2xl flex-shrink-0",
                        children: achievement.icon
                    }, void 0, false, {
                        fileName: "[project]/components/ui/AchievementToast.tsx",
                        lineNumber: 29,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-bold text-brand-text text-sm leading-tight",
                                children: achievement.title
                            }, void 0, false, {
                                fileName: "[project]/components/ui/AchievementToast.tsx",
                                lineNumber: 33,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-brand-muted text-xs mt-0.5",
                                children: achievement.description
                            }, void 0, false, {
                                fileName: "[project]/components/ui/AchievementToast.tsx",
                                lineNumber: 34,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ui/AchievementToast.tsx",
                        lineNumber: 32,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ml-auto w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/AchievementToast.tsx",
                        lineNumber: 36,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/AchievementToast.tsx",
                lineNumber: 28,
                columnNumber: 11
            }, this)
        }, achievement.id, false, {
            fileName: "[project]/components/ui/AchievementToast.tsx",
            lineNumber: 20,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/AchievementToast.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_s(AchievementToast, "0VlhNmc5FgqBSlEGEVV+2YworXo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStore"]
    ];
});
_c = AchievementToast;
var _c;
__turbopack_context__.k.register(_c, "AchievementToast");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_bd0a4c4c._.js.map