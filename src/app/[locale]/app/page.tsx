import { App } from "@/components/main";
import { PROJECT_PLACEHOLDER } from "@/data/schema";

export default function IndexPage() {
  return <App projectId={PROJECT_PLACEHOLDER.id} />;
}
