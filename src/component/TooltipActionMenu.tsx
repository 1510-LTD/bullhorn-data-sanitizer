import { useRouter } from "next/navigation";

import { PlacesType, Tooltip } from "react-tooltip";

import styled from "styled-components";
import { MoreHorizontalIcon } from "./icons";

export interface TooltipActionMenuItem<T> {
  label: string;
  actionOrPath: ((data?: T) => string | void) | string;
  disabled?: boolean;
  remove?: boolean;
}

interface Props<T> {
  items?: TooltipActionMenuItem<T>[];
  placement?: PlacesType;
  data?: T;
}

export function TooltipActionMenu<T>({
  items,
  placement = "left",
  data
}: Props<T>) {
  const router = useRouter();
  const processAction = (
    actionOrPath: ((data?: T) => void | string) | string
  ) => {
    if (typeof actionOrPath === "string") {
      if (actionOrPath) {
        router.push(actionOrPath);
      }
    } else if (typeof actionOrPath === "function") {
      const path = actionOrPath(data);
      if (path) router.push(path);
    }
  };

  const randomId = Math.random().toString(36).substring(7);

  return (
    <Wrapper>
      <CellButton>
        <MoreHorizontalIcon data-tooltip-id={`action-tooltip-${randomId}`} />
      </CellButton>

      <Tooltip id={`action-tooltip-${randomId}`} place={placement} clickable>
        <TipContentClick>
          {items?.map(
            ({ actionOrPath, label, disabled, remove = false }, index) =>
              !remove && (
                <ActionButton
                  $disabled={!!disabled}
                  title={disabled ? "Not allowed!" : label}
                  onClick={() => !disabled && processAction(actionOrPath)}
                  key={index}
                >
                  {label}
                </ActionButton>
              )
          )}
        </TipContentClick>
      </Tooltip>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: block;
`;

const TipContentClick = styled.div`
  cursor: pointer;
  width: max-content;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  :hover {
    background: var(--purple-background-color);
  }
`;

const ActionButton = styled.button<{ $disabled: boolean }>`
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  color: ${({ $disabled }) =>
    $disabled ? "var(--text-light)" : "var(--text-dark)"};
`;

const CellButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  transform: rotate(90deg);

  :hover {
    fill: var(--blue-main);
  }

  svg {
    fill: var(--text-dark);
  }
`;
