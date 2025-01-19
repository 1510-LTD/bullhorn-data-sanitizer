import { getKeyPairJsxLabel } from "@/component/util";
import styled from "styled-components";
import { BodyText1, CaptionText } from "@/utils/fonts";
import { Badge } from "@/component/badge";

import { Card } from "@/component/Card";

import { FlexColumnGapWrapper, FlexGapWrapper } from "@/utils/styled";
import { getConcatedUserName } from "@/utils/converter";
import { User } from "@/app/api/_components/modules/user/UserSchema";
import { ModeEditIcon } from "@/component/icons";
import { Button } from "@/component/button";
import EditUser from "./EditUser";
import { useState } from "react";

interface Props {
  data: User;
}

const UserCard = ({
  data: {
    id,
    firstName,
    lastName,
    email,
    note,
    isActive,
    dailyMailingLimit,
    createdBy,
    updatedBy,
    createdAt,
    updatedAt
  }
}: Props) => {
  const [isOpen, setIsOpen] = useState<string | undefined>(undefined);

  return (
    <ListCardContainer>
      <ContentContainer>
        <FlexColumnGapWrapper $gap="0.25rem">
          <DescriptionContainer>
            <FlexColumnGapWrapper $gap="0.25rem">
              <BodyText1>{email}</BodyText1>
              <CaptionText>
                {getConcatedUserName({ firstName, lastName })}
              </CaptionText>
              <CaptionText>{note}</CaptionText>
            </FlexColumnGapWrapper>
            <ActionContainer $gap="1rem">
              <Badge
                backgroundColor={
                  dailyMailingLimit > 1000
                    ? "var(--badge-neutral)"
                    : "var(--badge-warn)"
                }
                label={`Daily mail limit ${dailyMailingLimit}`}
              />
              <Badge
                backgroundColor={
                  isActive ? "var(--badge-success)" : "var(--badge-error)"
                }
                label={isActive ? "Active" : "Inactive"}
              />
              <Button
                leadingIcon={<ModeEditIcon />}
                onClick={() => setIsOpen(id)}
              />
            </ActionContainer>
          </DescriptionContainer>

          <InfoBarWrapper $gap="1.5rem">
            {getKeyPairJsxLabel(
              "Created by",
              createdBy ? getConcatedUserName(createdBy) : "N/A"
            )}
            {getKeyPairJsxLabel("Created at", createdAt.toLocaleDateString())}
            {getKeyPairJsxLabel(
              "Updated by",
              updatedBy ? getConcatedUserName(updatedBy) : "N/A"
            )}
            {getKeyPairJsxLabel("Updated at", updatedAt?.toLocaleDateString())}
          </InfoBarWrapper>
        </FlexColumnGapWrapper>
      </ContentContainer>

      {isOpen && (
        <EditUser
          id={isOpen}
          isOpen={true}
          onClose={() => setIsOpen(undefined)}
        />
      )}
    </ListCardContainer>
  );
};

export default UserCard;

const ListCardContainer = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  width: 100%;
  gap: 1rem;
`;

const ContentContainer = styled(FlexColumnGapWrapper)`
  width: 100%;
`;

const InfoBarWrapper = styled(FlexGapWrapper)`
  justify-content: end;
  width: 100%;
`;

const DescriptionContainer = styled(FlexGapWrapper)`
  justify-content: space-between;
`;

const ActionContainer = styled(FlexGapWrapper)`
  justify-content: end;
  align-items: center;
`;
