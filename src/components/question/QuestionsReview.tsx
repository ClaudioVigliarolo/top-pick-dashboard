import React from "react";
import ListItem from "@material-ui/core/ListItem";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import {
  CircularProgress,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import LinkOutlinedIcon from "@material-ui/icons/LinkOutlined";
import BookmarkAddedIcon from "@material-ui/icons/Bookmark";
import { CONSTANTS } from "@/constants/app";
import QuestionDialog from "./dialog";
import Button from "@/components/ui/buttons/Button";
import { COLORS } from "@/constants/colors";
import { QuestionCreated } from "@toppick/common";
const LIST_ITEM_HEIGTH = 100;
const LIST_ITEM_MARGIN = 25;

const NO_QUESTION: QuestionCreated = {
  title: "",
  examples: [],
  id: -1,
  new: true,
  resources: [],
  user_id: "",
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 50,
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 30,
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    width: 600,
    justifyContent: "space-evenly",
    paddingBottom: 100,
  },
}));

export default function QuestionsReview({
  questions,
  onSubmit,
  onChange,
  loading,
  onClose,
}: {
  questions: QuestionCreated[];
  onSubmit: () => void;
  onChange: (index: number, question: QuestionCreated) => void;
  loading: boolean;
  onClose: () => void;
}) {
  const [articlesDialog, setArticlesDialog] = React.useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] =
    React.useState<QuestionCreated>(NO_QUESTION);
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    React.useState<number>(-1);

  const classes = useStyles();

  const renderRow = ({ index }: ListChildComponentProps) => {
    return (
      <ListItem
        button
        key={index}
        style={{
          backgroundColor: "white",
          marginBottom: 25,
          height: LIST_ITEM_HEIGTH,
        }}
      >
        <ListItemIcon>
          {questions[index]!.resources!.length > 0 ||
          questions[index]!.examples!.length > 0 ? (
            <BookmarkAddedIcon
              onClick={() => {
                setCurrentQuestion(questions[index]);
                setCurrentQuestionIndex(index);
                setArticlesDialog(true);
              }}
            />
          ) : (
            <LinkOutlinedIcon
              onClick={() => {
                setCurrentQuestion(questions[index]);
                setCurrentQuestionIndex(index);
                setArticlesDialog(true);
              }}
            />
          )}
        </ListItemIcon>
        <ListItemText secondary={questions[index].title} primary={index + 1} />
      </ListItem>
    );
  };

  return (
    <div className={classes.container}>
      <FixedSizeList
        width={
          window.innerWidth > CONSTANTS.SMALL_SCREEN
            ? window.innerWidth * 0.7
            : window.innerWidth * 0.4
        }
        height={questions.length * (LIST_ITEM_MARGIN + LIST_ITEM_HEIGTH)}
        itemSize={50}
        itemCount={questions.length}
      >
        {renderRow}
      </FixedSizeList>
      <div style={{ marginTop: 50 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <div className={classes.buttonContainer}>
            <Button
              onClick={onClose}
              color="red"
              title="Revert, change something"
            />
            <Button
              onClick={onSubmit}
              color={COLORS.blue}
              title="Submit, everything's fine"
            />
          </div>
        )}
      </div>
      <QuestionDialog
        open={articlesDialog}
        onConfirm={(q) => {
          onChange(currentQuestionIndex, q);
          setCurrentQuestion(NO_QUESTION);
          setArticlesDialog(false);
        }}
        headerText="Edit Question"
        question={currentQuestion}
        onRefuse={() => {
          setCurrentQuestion(NO_QUESTION);
          setArticlesDialog(false);
        }}
      />
    </div>
  );
}
