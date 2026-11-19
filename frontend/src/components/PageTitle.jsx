import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BRAND = "Amir's Fresh Cut";
const DEFAULT_TITLE = `${BRAND} – Trusted Meat Supplier | Fresh Chicken, Mutton, Fish & Eggs`;

const TITLES = [
  [/^\/$/, DEFAULT_TITLE],
  [/^\/about\/?$/, `About Us | ${BRAND}`],
  [/^\/catalog\/?$/, `Meat Products & Catalog | ${BRAND}`],
  [/^\/news\/[^/]+\/?$/, `News & Media | ${BRAND}`],
  [/^\/news\/?$/, `News & Media | ${BRAND}`],
  [/^\/contact\/?$/, `Contact Us | ${BRAND}`],
  [/^\/privacy-policy\/?$/, `Privacy Policy | ${BRAND}`],
  [/^\/terms\/?$/, `Terms & Conditions | ${BRAND}`],
  [/^\/admin\/dashboard\/?$/, `Dashboard | ${BRAND} Admin`],
  [/^\/admin\/profile\/?$/, `Profile | ${BRAND} Admin`],
  [/^\/admin\/inquiries/, `Inquiries | ${BRAND} Admin`],
  [/^\/admin\/?$/, `Admin Login | ${BRAND}`],
];

export default function PageTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    const match = TITLES.find(([re]) => re.test(pathname));
    document.title = match ? match[1] : DEFAULT_TITLE;
  }, [pathname]);

  return null;
}
