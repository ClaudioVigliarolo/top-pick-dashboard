import { TextField } from "@material-ui/core";
import React from "react";
import { generateQuestions } from "@/utils/topics";
import { countTextLines } from "@/utils/utils";
import { AppDialog, TabData } from "../ui/dialog/DialogStyles";
import { AuthContext } from "@/context/AuthContext";
import { DashLabel, QuestionCreated } from "@toppick/common";

interface QuestionsQuickAddDialogProps {
  open: boolean;
  loading: boolean;
  onConfirm: (questions: QuestionCreated[]) => void;
  onRefuse: () => void;
  minQuestions: number;
  topic: DashLabel;
}

export default function QuestionsQuickAddDialog(
  props: QuestionsQuickAddDialogProps
) {
  const [text, setText] = React.useState<string>("");
  const { userId } = React.useContext(AuthContext);

  let linesN = countTextLines(text);

  const onConfirm = async () => {
    props.onConfirm(generateQuestions(text, props.topic, userId));
  };

  const onRefuse = async () => {
    setText("");
    props.onRefuse();
  };

  const tabs: TabData[] = [
    {
      label: "Questions",
      children: (
        <>
          <TextField
            placeholder="Paste your questions here..."
            multiline
            rows={10}
            rowsMax={10}
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label="text"
            id="standard-helperText"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            fullWidth
          />
          <h2
            style={{
              color: linesN < props.minQuestions ? "orangered" : "blue",
            }}
          >
            Questions: {linesN}
          </h2>
        </>
      ),
    },
  ];

  return (
    <>
      <AppDialog
        loading={props.loading}
        open={props.open}
        minWidth={600}
        confirmButtonText="Continue"
        refuseButtonText="Close"
        headerText={"Quick Add to " + props.topic.title}
        minHeight={300}
        onConfirm={onConfirm}
        onRefuse={onRefuse}
        confirmButtonDisabled={linesN < props.minQuestions}
        tabData={tabs}
        showTabs={false}
      />
    </>
  );
}
