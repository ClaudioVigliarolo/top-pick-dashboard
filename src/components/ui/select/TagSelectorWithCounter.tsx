import React from "react";
import TagItem from "./TagItemWithCounter";
import { TextField, makeStyles } from "@material-ui/core";
import { SearchKeyword } from "@toppick/common";

interface TagSelectorProps {
  tags: SearchKeyword[];
  onRemove: (index: number) => void;
  onAdd: (tag: string) => void;
  onChangeCounter: (e: React.ChangeEvent<any>, index: number) => void;
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    width: 200,
    alignSelf: "center",
    textAlign: "center",
  },
  tagsContainer: {
    flexWrap: "wrap",
    display: "flex",
  },
}));

export default function TagSelectorWithCounter({
  tags,
  onRemove,
  onAdd,
  onChangeCounter,
}: TagSelectorProps) {
  const [title, setTitle] = React.useState("");
  const classes = useStyles();
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onAdd(title);
      setTitle("");
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.tagsContainer}>
        {tags.map((tag, i) => (
          <TagItem
            onRemove={() => onRemove(i)}
            counter={tag.counter}
            onChangeCounter={(e) => onChangeCounter(e, i)}
            tag={tag.title}
            key={i}
          />
        ))}
      </div>
      <div className={classes.textField}>
        <TextField
          InputLabelProps={{ shrink: true }}
          margin="dense"
          onKeyDown={handleKeyDown}
          label="Tag"
          placeholder="Type new Keyword..."
          id="standard-helperText"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          fullWidth
        />
      </div>
    </div>
  );
}
