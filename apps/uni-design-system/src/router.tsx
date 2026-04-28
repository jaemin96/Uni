import { createBrowserRouter } from "react-router-dom";
import { Shell } from "@/components/layout/Shell";
import { OverviewPage } from "@/pages/OverviewPage";
import { ColorsPage } from "@/pages/ColorsPage";
import { TypographyPage } from "@/pages/TypographyPage";
import { ButtonPage } from "@/pages/ButtonPage";
import { BadgePage } from "@/pages/BadgePage";
import { CardPage } from "@/pages/CardPage";
import { InputPage } from "@/pages/InputPage";
import { SeparatorPage } from "@/pages/SeparatorPage";
import { SkeletonPage } from "@/pages/SkeletonPage";
import { SpinnerPage } from "@/pages/SpinnerPage";
import { TabsPage } from "@/pages/TabsPage";
import { ThumbnailCardPage } from "@/pages/ThumbnailCardPage";
import { TitlePage } from "@/pages/TitlePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Shell />,
    children: [
      { index: true, element: <OverviewPage /> },
      { path: "colors", element: <ColorsPage /> },
      { path: "typography", element: <TypographyPage /> },
      { path: "button", element: <ButtonPage /> },
      { path: "badge", element: <BadgePage /> },
      { path: "card", element: <CardPage /> },
      { path: "input", element: <InputPage /> },
      { path: "separator", element: <SeparatorPage /> },
      { path: "skeleton", element: <SkeletonPage /> },
      { path: "spinner", element: <SpinnerPage /> },
      { path: "tabs", element: <TabsPage /> },
      { path: "thumbnail-card", element: <ThumbnailCardPage /> },
      { path: "title", element: <TitlePage /> },
    ],
  },
]);
