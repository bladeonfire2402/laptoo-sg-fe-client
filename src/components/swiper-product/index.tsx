import React from "react";
import { SwipperSectionWrapper } from "./styled";
import CustomSwipper from "@/components/custom-swipper";

const services = [
  {
    title: "Global Banking & Markets",
    description:
      "Financing, advisory services, risk distribution, and hedging for our institutional and corporate clients.",
    img: "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?_gl=1*uhusdn*_ga*NzEwODg2ODUyLjE3NDE5MjMzNzQ.*_ga_8JE65Q40S6*czE3NTExMjg5MjMkbzI3JGcxJHQxNzUxMTI5MTE4JGo2MCRsMCRoMA..", // Đổi thành đúng đường dẫn ảnh
  },
  {
    title: "Asset & Wealth Management",
    description: "Advice, investing, and execution for institutions and individuals across public and private markets.",
    img: "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?_gl=1*uhusdn*_ga*NzEwODg2ODUyLjE3NDE5MjMzNzQ.*_ga_8JE65Q40S6*czE3NTExMjg5MjMkbzI3JGcxJHQxNzUxMTI5MTE4JGo2MCRsMCRoMA..",
  },
  {
    title: "Platform Solutions",
    description: "Innovative and customer-centered financial solutions to power our clients’ businesses.",
    img: "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?_gl=1*uhusdn*_ga*NzEwODg2ODUyLjE3NDE5MjMzNzQ.*_ga_8JE65Q40S6*czE3NTExMjg5MjMkbzI3JGcxJHQxNzUxMTI5MTE4JGo2MCRsMCRoMA..",
  },
  {
    title: "Asset & Wealth Management",
    description: "Advice, investing, and execution for institutions and individuals across public and private markets.",
    img: "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?_gl=1*uhusdn*_ga*NzEwODg2ODUyLjE3NDE5MjMzNzQ.*_ga_8JE65Q40S6*czE3NTExMjg5MjMkbzI3JGcxJHQxNzUxMTI5MTE4JGo2MCRsMCRoMA..",
  },
  {
    title: "Platform Solutions",
    description: "Innovative and customer-centered financial solutions to power our clients’ businesses.",
    img: "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?_gl=1*uhusdn*_ga*NzEwODg2ODUyLjE3NDE5MjMzNzQ.*_ga_8JE65Q40S6*czE3NTExMjg5MjMkbzI3JGcxJHQxNzUxMTI5MTE4JGo2MCRsMCRoMA..",
  },
];

const Heading = {
  h1: "What we do",
  h2: "Delivering for Our Clients",
};

interface Headings {
  h1?: string;
  h2?: string;
}

interface SwiperSectionProps {
  heading?: Headings;
  services?: any[];
}

const SwipperSection = () => {
  return (
    <SwipperSectionWrapper>
      <CustomSwipper listItems={services} />
    </SwipperSectionWrapper>
  );
};

export default SwipperSection;
