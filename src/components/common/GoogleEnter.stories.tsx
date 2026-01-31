import type { Meta, StoryObj } from "@storybook/react";
import GoogleEnter from "./GoogleEnter";

const meta: Meta<typeof GoogleEnter> = {
  title: "Components/GoogleEnter",
  component: GoogleEnter,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GoogleEnter>;

export const Primary: Story = {
  // parameters: {
  //   docs: {
  //     description: {
  //       story: "dop info",
  //     },
  //   },
  // },
  // decorators: -обертка для styles
  args: {},
};
