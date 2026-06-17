import ServiceDetailPage from "../components/services/ServiceDetailPage";
import { getServiceBySlug } from "../components/services/servicesData";

export default function CollateralManagementPage() {
  const service = getServiceBySlug("collateral-management")!;
  return <ServiceDetailPage service={service} />;
}