import React, { useState, useMemo, useEffect, useContext } from "react";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  TextField,
  InputAdornment,
  Typography,
  Box,
  useTheme as useMuiTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { ThemeContext } from "../context/ThemeContext";
import { useToast } from "../hooks/useToast";
import {
  Search,
  Add,
  FilterList,
  Clear,
  MoreHoriz,
  ArrowUpward,
  ArrowDownward,
  CalendarToday,
  ChevronLeft,
  ChevronRight,
  ContentCopy,
} from "@mui/icons-material";

import { orders } from "../data/dashboardData";
import nataliCraig from "../assets/images/profiles/natali-craig.png";
import drewCano from "../assets/images/profiles/drew-cano.png";
import orlandoDiggs from "../assets/images/profiles/orlando-diggs.png";
import andiLane from "../assets/images/profiles/andi-lane.png";
import kateMorrison from "../assets/images/profiles/kate-morrison.png";
import korayOkumus from "../assets/images/profiles/koray-okumus.png";

const ArrowDownUp = (props) => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
    <path d="m21 16-4 4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="m3 8 4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LeftPaginationSVG = ({ style }) => (
  <svg width="244" height="28" viewBox="0 0 244 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", ...style }}>
    {/* full paths kept as before - omitted for brevity in this snippet */}
    <path fillRule="evenodd" clipRule="evenodd" d="M16.9254 8.55806C17.1915 8.80214 17.1915 9.19786 16.9254 9.44194L12.4375 13.5581C12.1714 13.8021 12.1714 14.1979 12.4375 14.4419L16.9254 18.5581C17.1915 18.8021 17.1915 19.1979 16.9254 19.4419C16.6593 19.686 16.2278 19.686 15.9617 19.4419L11.4738 15.3258C10.6754 14.5936 10.6754 13.4064 11.4738 12.6742L15.9617 8.55806C16.2278 8.31398 16.6593 8.31398 16.9254 8.55806Z" fill="#1C1C1C"/>
  </svg>
);

const CustomPagination = ({ totalPages, currentPage, onChange, themeMode }) => {
  const muiTheme = useMuiTheme();
  const isDark = themeMode === "dark";
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  const getWindow = (total, page) => {
    const maxButtons = 7;
    if (total <= maxButtons) return Array.from({ length: total }, (_, i) => i + 1);
    const result = [];
    const left = Math.max(2, page - 2);
    const right = Math.min(total - 1, page + 2);
    result.push(1);
    if (left > 2) result.push("left-ellipsis");
    for (let i = left; i <= right; i++) result.push(i);
    if (right < total - 1) result.push("right-ellipsis");
    result.push(total);
    return result;
  };

  const pages = getWindow(totalPages, currentPage);

  const pageButtonStyle = (active) => ({
    minWidth: 28,
    height: 28,
    borderRadius: 4,
    padding: "0 8px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: active ? "default" : "pointer",
    background: active ? (isDark ? "var(--black-5, #FFFFFF1A)" : "var(--black-5, #1C1C1C0D)") : "transparent",
    color: active ? (isDark ? "#FFFFFF" : "#111827") : (isDark ? "#cbd5e1" : "#6b7280"),
    fontWeight: active ? 700 : 500,
    border: "none",
    fontSize: 13
  });

  return (
    <Box sx={{ 
      display: "flex", 
      alignItems: "center", 
      gap: { xs: 0.5, sm: 1 },
      flexWrap: isMobile ? "wrap" : "nowrap",
      justifyContent: "flex-end"
    }}>
      <IconButton 
        size="small" 
        onClick={() => onChange(Math.max(1, currentPage - 1))} 
        disabled={currentPage === 1} 
        sx={{ 
          width: 32, 
          height: 28,
          color: isDark ? "#FFFFFF" : undefined,
          "&.Mui-disabled": {
            color: isDark ? "rgba(255, 255, 255, 0.3)" : undefined
          }
        }}
      >
        <ChevronLeft fontSize="small" />
      </IconButton>

      <Box sx={{ display: "inline-flex", gap: 0.5, alignItems: "center" }}>
        {pages.map((p, idx) =>
          p === "left-ellipsis" || p === "right-ellipsis" ? (
            <Box key={p + idx} sx={{ px: 1.25, color: "text.secondary", fontSize: 13 }}>…</Box>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p)}
              aria-current={p === currentPage ? "page" : undefined}
              style={pageButtonStyle(p === currentPage)}
            >
              {p}
            </button>
          )
        )}
      </Box>

      <IconButton 
        size="small" 
        onClick={() => onChange(Math.min(totalPages, currentPage + 1))} 
        disabled={currentPage === totalPages} 
        sx={{ 
          width: 32, 
          height: 28,
          color: isDark ? "#FFFFFF" : undefined,
          "&.Mui-disabled": {
            color: isDark ? "rgba(255, 255, 255, 0.3)" : undefined
          }
        }}
      >
        <ChevronRight fontSize="small" />
      </IconButton>
    </Box>
  );
};

const OrdersPage = ({ isMobile: propIsMobile }) => {
  const muiTheme = useMuiTheme();
  const { darkMode } = useContext(ThemeContext);
  const { showSuccessToast } = useToast();
  const isMobileBreakpoint = useMediaQuery(muiTheme.breakpoints.down("sm"));

  const isMobile = propIsMobile !== undefined ? propIsMobile : isMobileBreakpoint;

  // state
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortMenuAnchor, setSortMenuAnchor] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [activeFilters, setActiveFilters] = useState({ status: "All", dateRange: "All Time" });

  // fixed items per page
  const itemsPerPage = 10;

  const isDarkMode = darkMode;
  const tickColor = isDarkMode ? "#C6C7F8" : "#1C1C1C";

  const dashboardColors = {
    light: { background: "#ffffff", cardBackground: "#ffffff", border: "rgba(0,0,0,0.12)", text: { primary: "#111827", secondary: "#6b7280" }, hover: "#f9fafb" },
    dark: { background: "#1C1C1C", cardBackground: "#282828", border: "rgba(255,255,255,0.06)", text: { primary: "#fff", secondary: "#cbd5e1" }, hover: "#252525" },
  };
  const colors = isDarkMode ? dashboardColors.dark : dashboardColors.light;

  // status color map
  const statusColorMap = {
    "In Progress": "#3b82f6",
    "Complete": "#10b981",
    "Pending": "#06b6d4",
    "Approved": "#f59e0b",
    "Rejected": "#9ca3af"
  };

  // avatar helpers
  const profileImageMap = {
    "Natali Craig": nataliCraig,
    "Kate Morrison": kateMorrison,
    "Drew Cano": drewCano,
    "Orlando Diggs": orlandoDiggs,
    "Andi Lane": andiLane,
    "Koray Okumus": korayOkumus,
  };
  const getProfileImage = (name) => profileImageMap[name] || [nataliCraig, kateMorrison, drewCano, orlandoDiggs, andiLane, korayOkumus][name.length % 6];
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.split(" ").filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };


  // ---------- sorting helpers ----------
  const getSortedData = (data, sortConfig) => {
    if (!sortConfig?.key) return data;
    return [...data].sort((a, b) => {
      let aVal, bVal;
      switch (sortConfig.key) {
        case "id":
          aVal = parseInt(a.id.replace("#CM", "")) || 0;
          bVal = parseInt(b.id.replace("#CM", "")) || 0;
          break;
        case "user":
          aVal = a.user.name.toLowerCase(); bVal = b.user.name.toLowerCase(); break;
        case "project":
          aVal = a.project.toLowerCase(); bVal = b.project.toLowerCase(); break;
        case "address":
          aVal = a.address.toLowerCase(); bVal = b.address.toLowerCase(); break;
        case "date":
          aVal = a.dateSort; bVal = b.dateSort; break;
        case "status": {
          const order = { Pending: 1, "In Progress": 2, Approved: 3, Complete: 4, Rejected: 5 };
          aVal = order[a.status] || 99; bVal = order[b.status] || 99; break;
        }
        default:
          aVal = a[sortConfig.key]; bVal = b[sortConfig.key];
      }
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const filteredOrders = useMemo(() => {
    let filtered = orders;
    if (activeFilters.status !== "All") filtered = filtered.filter((o) => o.status === activeFilters.status);
    if (activeFilters.dateRange !== "All Time") {
      if (activeFilters.dateRange === "Today") filtered = filtered.filter(o => o.date.includes("now") || o.date.includes("minute") || o.date.includes("hour"));
      if (activeFilters.dateRange === "Yesterday") filtered = filtered.filter(o => o.date === "Yesterday");
    }
    if (searchTerm.trim()) {
      const s = searchTerm.toLowerCase();
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(s) ||
        order.user.name.toLowerCase().includes(s) ||
        order.project.toLowerCase().includes(s) ||
        order.address.toLowerCase().includes(s) ||
        order.status.toLowerCase().includes(s) ||
        order.date.toLowerCase().includes(s)
      );
    }
    return filtered;
  }, [searchTerm, activeFilters]);

  const sortedAndFilteredOrders = useMemo(() => getSortedData(filteredOrders, sortConfig), [filteredOrders, sortConfig]);

  // ---------- pagination ----------
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / itemsPerPage));
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedAndFilteredOrders.slice(start, start + itemsPerPage);
  }, [sortedAndFilteredOrders, currentPage]);

  // ---------- handlers ----------
  const handleSearchChange = (e) => { setSearchTerm(e.target.value); setCurrentPage(1); setSelectedRows([]); };
  const handleClearSearch = () => { setSearchTerm(""); setCurrentPage(1); setSelectedRows([]); };
  const handlePageChange = (page) => { setCurrentPage(page); setSelectedRows([]); };

  const handleSortMenuOpen = (e) => setSortMenuAnchor(e.currentTarget);
  const handleSortMenuClose = () => setSortMenuAnchor(null);
  const handleSortChange = (key) => {
    setSortConfig(prev => prev.key === key ? { key, direction: prev.direction === "asc" ? "desc" : "asc" } : { key, direction: "asc" });
    setCurrentPage(1);
    setSelectedRows([]);
    handleSortMenuClose();
  };

  const handleFilterClick = (e) => setFilterAnchorEl(e.currentTarget);
  const handleFilterClose = () => setFilterAnchorEl(null);
  const handleFilterChange = (type, value) => { setActiveFilters(prev => ({ ...prev, [type]: value })); setCurrentPage(1); setSelectedRows([]); };

  const handleSelectAll = (e) => {
    if (e.target.checked) setSelectedRows(paginatedOrders.map((_, i) => i)); else setSelectedRows([]);
  };
  const handleSelectRow = (i) => (e) => {
    if (e.target.checked) setSelectedRows(prev => [...prev, i]); else setSelectedRows(prev => prev.filter(x => x !== i));
  };
  const isAllSelected = selectedRows.length === paginatedOrders.length && paginatedOrders.length > 0;
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < paginatedOrders.length;

  const handleCopyAddress = async (address) => {
    try {
      await navigator.clipboard.writeText(address);
      showSuccessToast("Address copied to clipboard!");
    } catch {
      showSuccessToast("Failed to copy address");
    }
  };

  const highlightText = (text, s) => {
    if (!s.trim()) return text;
    const re = new RegExp(`(${s})`, "gi");
    const parts = String(text).split(re);
    return parts.map((p, i) => re.test(p) ? <span key={i} style={{ backgroundColor: isDarkMode ? '#fef3c7' : '#fffbeb', color: isDarkMode ? '#000' : '#92400e', fontWeight: 600, borderRadius: 2, padding: '1px 2px' }}>{p}</span> : p);
  };

  // responsive wrapper: if wide enough let content grow, else maxWidth 1172
  const [useFullWidth, setUseFullWidth] = useState(() => window.innerWidth >= 1400);
  useEffect(() => {
    const onResize = () => setUseFullWidth(window.innerWidth >= 1400);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <Box sx={{ px: isMobile ? 2 : 3, bgcolor: colors.background, minHeight: "100vh", py: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Typography component="h1" sx={{ fontWeight: 700, fontSize: isMobile ? "18px" : "22px", color: colors.text.primary }}>Order List</Typography>
      </Box>

      <Box sx={{ width: "100%", maxWidth: useFullWidth ? "100%" : 1172, mx: "auto" }}>
        {/* FIXED: action row with better mobile layout */}
        <Box sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "center",
          gap: isMobile ? 2 : 1,
          p: 1.5,
          mb: 2,
          borderRadius: 2,
          border: `1px solid ${colors.border}`,
          background: isDarkMode ? "#272727" : "#f7f9fb",
        }}>
          {/* Action buttons row */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Tooltip title="Add">
              <IconButton size="small" sx={{ width: 36, height: 36, color: isDarkMode ? "#FFFFFF" : colors.text.secondary }}>
                <Add fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Filter">
              <IconButton 
                onClick={handleFilterClick} 
                size="small" 
                sx={{ 
                  width: 36, 
                  height: 36, 
                  color: activeFilters.status !== 'All' || activeFilters.dateRange !== 'All Time' 
                    ? (isDarkMode ? "#90caf9" : "#1976d2")
                    : (isDarkMode ? colors.text.secondary : "#9ca3af")
                }}
              >
                <FilterList fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Sort">
              <IconButton onClick={handleSortMenuOpen} size="small" sx={{ width: 36, height: 36 }}>
                <ArrowDownUp style={{ color: isDarkMode ? colors.text.secondary : "#9ca3af" }} />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Search field - full width on mobile, auto width on desktop */}
          <Box sx={{ 
            width: isMobile ? "100%" : "auto",
            ml: isMobile ? 0 : "auto" 
          }}>
            <TextField
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ ml: 1, mr: 0 }}>
                    <Search sx={{ 
                      color: isDarkMode ? "rgba(255, 255, 255, 0.5)" : "#272727",
                      fontSize: 16,
                      width: 16,
                      height: 16
                    }} />
                  </InputAdornment>
                ),
                endAdornment: searchTerm ? (
                  <InputAdornment position="end">
                    <IconButton 
                      size="small" 
                      onClick={handleClearSearch}
                      sx={{ 
                        color: isDarkMode ? "rgba(255, 255, 255, 0.5)" : colors.text.secondary,
                        padding: "4px",
                        "&:hover": {
                          color: isDarkMode ? "rgba(255, 255, 255, 0.7)" : colors.text.primary
                        }
                      }}
                    >
                      <Clear fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null
              }}
              sx={{
                width: isMobile ? "100%" : 160,
                "& .MuiOutlinedInput-root": {
                  height: 28,
                  borderRadius: "8px",
                  bgcolor: isDarkMode ? "#272727" : "#f7f9fb",
                  color: colors.text.primary,
                  padding: "4px 8px",
                  gap: "8px",
                  "& fieldset": { 
                    borderColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : colors.border, 
                    borderRadius: "8px",
                    borderWidth: 1
                  },
                  "&:hover fieldset": { 
                    borderColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : colors.border 
                  },
                  "&.Mui-focused fieldset": { 
                    borderColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : colors.border 
                  },
                  "& .MuiInputBase-input": { 
                    padding: "0 0 0 8px", 
                    height: 20, 
                    boxSizing: "border-box", 
                    fontSize: 14,
                    color: isDarkMode ? colors.text.primary : "#272727",
                    "&::placeholder": { 
                      color: isDarkMode ? "rgba(255, 255, 255, 0.5)" : "#272727", 
                      opacity: 1 
                    }
                  },
                  "& .MuiInputAdornment-root": {
                    margin: 0
                  }
                }
              }}
            />
          </Box>
        </Box>

        {/* table */}
        <TableContainer 
          component={Box} 
          sx={{ 
            width: "100%", 
            opacity: 1, 
            borderRadius: 2, 
            bgcolor: isDarkMode ? colors.background : colors.cardBackground, 
            border: "none",
            borderBottom: `1px solid ${colors.border}`,
            overflow: "hidden"
          }}
        >
          <Table stickyHeader size="small" sx={{ bgcolor: isDarkMode ? colors.background : colors.cardBackground, "& .MuiTable-root": { bgcolor: isDarkMode ? colors.background : colors.cardBackground } }}>
            <TableHead>
              <TableRow sx={{ position: "sticky", top: 0, zIndex: 10, backgroundColor: isDarkMode ? colors.background : colors.cardBackground }}>
                <TableCell padding="checkbox" sx={{ py: 0.75, borderBottom: `2px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : colors.border}`, bgcolor: isDarkMode ? colors.background : colors.cardBackground }}>
                  <Checkbox checked={isAllSelected} indeterminate={isIndeterminate} onChange={handleSelectAll} disabled={paginatedOrders.length === 0} sx={{ color: colors.text.secondary, "&.Mui-checked": { color: tickColor } }} />
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: colors.text.secondary, py: 0.75, px: 1, borderBottom: `2px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : colors.border}`, bgcolor: isDarkMode ? colors.background : colors.cardBackground }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: colors.text.secondary, py: 0.75, px: 1, borderBottom: `2px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : colors.border}`, bgcolor: isDarkMode ? colors.background : colors.cardBackground }}>User</TableCell>
                <TableCell sx={{ fontWeight: 600, color: colors.text.secondary, py: 0.75, px: 1, borderBottom: `2px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : colors.border}`, bgcolor: isDarkMode ? colors.background : colors.cardBackground }}>Project</TableCell>
                <TableCell sx={{ fontWeight: 600, color: colors.text.secondary, py: 0.75, px: 1, borderBottom: `2px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : colors.border}`, bgcolor: isDarkMode ? colors.background : colors.cardBackground }}>Address</TableCell>
                <TableCell sx={{ fontWeight: 600, color: colors.text.secondary, py: 0.75, px: 1, borderBottom: `2px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : colors.border}`, bgcolor: isDarkMode ? colors.background : colors.cardBackground }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600, color: colors.text.secondary, py: 0.75, px: 1, borderBottom: `2px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : colors.border}`, bgcolor: isDarkMode ? colors.background : colors.cardBackground }}>Status</TableCell>
                <TableCell sx={{ py: 0.75, px: 1, borderBottom: `2px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : colors.border}`, bgcolor: isDarkMode ? colors.background : colors.cardBackground }} />
              </TableRow>
            </TableHead>

            <TableBody>

              {paginatedOrders.map((order, idx) => (
                <TableRow 
                  key={`${order.id}-${idx}`} 
                  hover 
                  sx={{ 
                    "& .MuiTableCell-root": { borderBottom: `1px solid ${colors.border}`, bgcolor: isDarkMode ? colors.background : colors.cardBackground },
                    minHeight: 48,
                    bgcolor: isDarkMode ? colors.background : colors.cardBackground,
                    "&:hover": { background: colors.hover },
                    "&:hover .MuiTableCell-root": { bgcolor: colors.hover }
                  }}
                >
                  <TableCell padding="checkbox" sx={{ py: 0.75, bgcolor: "inherit" }}>
                    <Checkbox checked={selectedRows.includes(idx)} onChange={handleSelectRow(idx)} sx={{ color: colors.text.secondary, "&.Mui-checked": { color: tickColor } }} />
                  </TableCell>

                  <TableCell sx={{ py: 0.75, px: 1, bgcolor: "inherit" }}><Typography sx={{ fontWeight: 400, fontSize: 13, color: colors.text.primary }}>{highlightText(order.id, searchTerm)}</Typography></TableCell>

                  <TableCell sx={{ py: 0.75, px: 1, bgcolor: "inherit" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar src={getProfileImage(order.user.name)} sx={{ width: 26, height: 26, fontSize: 12 }}>{getInitials(order.user.name)}</Avatar>
                      <Typography sx={{ fontWeight: 400, fontSize: 13, color: colors.text.primary }}>{highlightText(order.user.name, searchTerm)}</Typography>
                    </Box>
                  </TableCell>

                  <TableCell sx={{ py: 0.75, px: 1, bgcolor: "inherit" }}><Typography sx={{ color: colors.text.secondary, fontSize: 13 }}>{highlightText(order.project, searchTerm)}</Typography></TableCell>

                  <TableCell 
                    sx={{ 
                      py: 0.75, 
                      px: 1, 
                      bgcolor: "inherit",
                      position: "relative"
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                      <Typography sx={{ color: colors.text.secondary, fontSize: 13 }}>{highlightText(order.address, searchTerm)}</Typography>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyAddress(order.address);
                        }}
                        sx={{
                          opacity: 0,
                          transition: "opacity 0.2s",
                          padding: "4px",
                          width: 20,
                          height: 20,
                          color: colors.text.secondary,
                          "&:hover": {
                            color: colors.text.primary,
                            bgcolor: "transparent"
                          },
                          ".MuiTableRow-root:hover &": {
                            opacity: 1
                          }
                        }}
                      >
                        <ContentCopy sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Box>
                  </TableCell>

                  <TableCell sx={{ py: 0.75, px: 1, bgcolor: "inherit" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                      <CalendarToday sx={{ fontSize: 16, color: colors.text.secondary }} />
                      <Typography sx={{ color: colors.text.secondary, fontSize: 13 }}>{highlightText(order.date, searchTerm)}</Typography>
                    </Box>
                  </TableCell>

                  <TableCell sx={{ py: 0.75, px: 1, bgcolor: "inherit" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: statusColorMap[order.status] || colors.text.secondary
                        }}
                      />
                      <Typography sx={{ color: colors.text.secondary, fontSize: 13 }}>{order.status}</Typography>
                    </Box>
                  </TableCell>

                  <TableCell sx={{ py: 0.75, px: 1, bgcolor: "inherit" }}>
                    <IconButton size="small" sx={{ color: colors.text.secondary, opacity: 0, ".MuiTableRow-root:hover &": { opacity: 1 }, width: 28, height: 28 }}>
                      <MoreHoriz fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {paginatedOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} sx={{ textAlign: "center", borderBottom: "none", py: 6, bgcolor: isDarkMode ? colors.background : colors.cardBackground }}>
                    <Typography sx={{ color: colors.text.secondary }}>No orders available</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* pagination */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mt: 2 }}>
          <CustomPagination 
            totalPages={totalPages} 
            currentPage={currentPage} 
            onChange={handlePageChange} 
            themeMode={isDarkMode ? "dark" : "light"} 
          />
        </Box>
      </Box>

      {/* Sort menu */}
      <Menu 
        anchorEl={sortMenuAnchor} 
        open={Boolean(sortMenuAnchor)} 
        onClose={handleSortMenuClose}
        disableScrollLock
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            bgcolor: isDarkMode ? colors.cardBackground : "#ffffff",
            border: `1px solid ${colors.border}`,
            mt: 0.5,
            "& .MuiMenuItem-root": {
              color: colors.text.primary,
              "&:hover": {
                bgcolor: colors.hover
              }
            }
          }
        }}
      >
        <MenuItem onClick={() => handleSortChange("id")}>Order ID {sortConfig.key === "id" && (sortConfig.direction === "asc" ? <ArrowUpward sx={{ ml: 1 }} /> : <ArrowDownward sx={{ ml: 1 }} />)}</MenuItem>
        <MenuItem onClick={() => handleSortChange("user")}>User {sortConfig.key === "user" && (sortConfig.direction === "asc" ? <ArrowUpward sx={{ ml: 1 }} /> : <ArrowDownward sx={{ ml: 1 }} />)}</MenuItem>
        <MenuItem onClick={() => handleSortChange("project")}>Project {sortConfig.key === "project" && (sortConfig.direction === "asc" ? <ArrowUpward sx={{ ml: 1 }} /> : <ArrowDownward sx={{ ml: 1 }} />)}</MenuItem>
        <MenuItem onClick={() => handleSortChange("date")}>Date {sortConfig.key === "date" && (sortConfig.direction === "asc" ? <ArrowUpward sx={{ ml: 1 }} /> : <ArrowDownward sx={{ ml: 1 }} />)}</MenuItem>
        <MenuItem onClick={() => handleSortChange("status")}>Status {sortConfig.key === "status" && (sortConfig.direction === "asc" ? <ArrowUpward sx={{ ml: 1 }} /> : <ArrowDownward sx={{ ml: 1 }} />)}</MenuItem>
      </Menu>

      {/* Filter menu */}
      <Menu 
        anchorEl={filterAnchorEl} 
        open={Boolean(filterAnchorEl)} 
        onClose={handleFilterClose}
        disableScrollLock
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            bgcolor: isDarkMode ? colors.cardBackground : "#ffffff",
            border: `1px solid ${colors.border}`,
            mt: 0.5,
            "& .MuiMenuItem-root": {
              color: colors.text.primary,
              "&:hover": {
                bgcolor: colors.hover
              }
            }
          }
        }}
      >
        <Box sx={{ p: 1, minWidth: 200 }}>
          <Typography sx={{ fontWeight: 600, mb: 1, color: colors.text.primary }}>Filter by Status</Typography>
          {["All", "Complete", "In Progress", "Pending", "Approved", "Rejected"].map(s => (
            <MenuItem key={s} onClick={() => { handleFilterChange("status", s); handleFilterClose(); }} sx={{ bgcolor: activeFilters.status === s ? colors.hover : "transparent" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {s !== "All" && <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: statusColorMap[s] || colors.text.secondary }} />}
                <Typography sx={{ fontSize: 13, color: colors.text.primary }}>{s}</Typography>
                {activeFilters.status === s && <Box sx={{ ml: "auto", color: isDarkMode ? "#90caf9" : "#1976d2" }}>✓</Box>}
              </Box>
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </Box>
  );
};

export default OrdersPage;