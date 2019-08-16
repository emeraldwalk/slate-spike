import { Plugin, Range, Value } from 'slate';

export default function WordPlugin(): Plugin {
  return {
    onChange: (editor, next) => {
      const word = findWordAtFocus(editor.value);
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
  text: string;
}

function findWordAtOffset(
  text: string,
  offset: number
) {
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

  return {
    start,
    end,
    text: text.substring(start, end)
  };
}

function findWordAtFocus(
  value: Value
): TextRange | null {
  if(!value.focusText) {
    return null;
  }

  const fullText = value.focusText.text;
  const focus = value.selection.focus;
  const offset = focus.offset;

  const { start, end, text } = findWordAtOffset(
    fullText,
    offset
  );

  const path = focus.path.toArray();

  const range = Range.create({
    anchor: {
      offset: start,
      path
    },
    focus: {
      offset: end,
      path
    }
  }) as TextRange;

  range.text = text;

  return range;
}