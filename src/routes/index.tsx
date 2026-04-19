import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Astitva Kushwaha — Engineering Student & Builder" },
      {
        name: "description",
        content:
          "Portfolio of Astitva Kushwaha — B.Tech CSE student at IIIT Sonipat. Projects, skills, experience, and contact.",
      },
      { property: "og:title", content: "Astitva Kushwaha — Portfolio" },
      {
        property: "og:description",
        content: "Building. Learning. Shipping. — minimal portfolio of an engineering student.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <Portfolio />;
}
