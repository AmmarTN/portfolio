import TypeIt from "typeit-react";

interface TypewriterTitleProps {
  phrases: readonly string[];
}

const TypewriterTitle = ({ phrases }: TypewriterTitleProps) => {
  return (
    <span className="grid">
      {phrases.map((phrase, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="invisible col-start-1 row-start-1 whitespace-pre-line"
        >
          {phrase}
        </span>
      ))}
      <span className="col-start-1 row-start-1 whitespace-pre-line">
        <TypeIt
          as="span"
          options={{
            speed: 95,
            deleteSpeed: 55,
            startDelay: 250,
            loop: true,
            waitUntilVisible: true,
            cursorChar: "|",
          }}
          getBeforeInit={(instance) => {
            phrases.forEach((phrase) => {
              const parts = phrase.split("\n");
              parts.forEach((part, i) => {
                instance.type(part);
                if (i < parts.length - 1) instance.break();
              });
              instance.pause(1400).delete();
            });
            return instance;
          }}
        />
      </span>
    </span>
  );
};

export default TypewriterTitle;
