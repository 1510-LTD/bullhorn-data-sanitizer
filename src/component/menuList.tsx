import styled from "styled-components";

/**
 * Available from a range of components including icon buttons and text fields,
 * menus offer a list of choices on a temporary surface.
 */
export const MenuList = styled.ul<{
  $density?: "low" | "medium" | "high";
  $placement?: "left" | "right" | "stretch";
}>`
  display: flex;
  position: absolute;
  min-width: max-content;
  left: ${({ $placement = "left" }) => ($placement === "right" ? "unset" : 0)};
  right: ${({ $placement = "left" }) => ($placement === "left" ? "unset" : 0)};
  z-index: 5;
  max-height: 22rem;
  overflow: clip;
  overflow-y: auto;
  flex-direction: column;
  align-items: stretch;
  background: white;
  color: var(--color-text-10);
  font-size: 1rem;
  font-weight: 500;
  border-radius: var(--border-radius-xs);
  box-shadow: var(--elevation-3);
  li {
    &.hidden {
      display: none;
    }
    border-inline: 1px solid transparent;
    display: flex;
    gap: var(--space-100);
    user-select: none;
    position: relative;
    list-style: none;
    padding: ${({ $density }) => {
        switch ($density) {
          case "low":
            return "var(--space-200)";
          case "medium":
            return "var(--space-150)";
          case "high":
            return "var(--space-100)";
          default:
            return "var(--space-150)";
        }
      }}
      var(--space-150);
    &:first-child {
      border-top-left-radius: var(--border-radius-xs);
      border-top-right-radius: var(--border-radius-xs);
    }
    &:last-child {
      border-bottom-left-radius: var(--border-radius-xs);
      border-bottom-right-radius: var(--border-radius-xs);
    }
    &.active,
    &[data-highlighted] {
      background: var(--clr-opacity-primary-8);
    }
  }
`;

MenuList.displayName = "MenuList";
