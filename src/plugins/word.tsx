import { Plugin, Range, Value } from 'slate';

export default function WordPlugin(): Plugin {
  return {
    onChange: (editor, next) => {
      const word = findWord(editor.value);
      console.log(word);
      if(word) {
        console.log(word.text);
        editor.select(word);
      }
      next();
    }
  };
}

interface TextRange extends Range {
  text?: string;
}

function findWord(
  value: Value
): TextRange | null {
  if(!value.focusText) {
    return null;
  }

  const text = value.focusText.text;
  const focus = value.selection.focus;
  const offset = focus.offset;

  const start = text.lastIndexOf(
    ' ',
    offset - 1
  ) + 1;

  let end = text.indexOf(
    ' ',
    offset
  );

  if(end < 0) {
    end = text.length;
  }

  const path = focus.path.toArray();

  const range: TextRange = Range.create({
    anchor: {
      offset: start,
      path
    },
    focus: {
      offset: end,
      path
    }
  });

  range.text = text.substring(
    start,
    end
  );

  return range;
}