import React from 'react';
import { ThemeContext } from 'styled-components';
import { Keyboard, Text } from 'grommet';
import { FormClose } from 'grommet-icons/icons/FormClose';
import { StyledTag, StyledIcon } from './StyledTag';
import { ITagProps } from './TagProps';

/**
 * A tag control with a label and icon<br/>
 * `import { Tag } from 'grommet-controls';`<br/>
 * `<Tag label={...} icon={...} />`<br/>
 */
const Tag = React.forwardRef<HTMLDivElement, ITagProps>(
        ({
      disabled, label, a11yTitle, reverse, background, onClick, onChange,
      icon, color, focusable, round, size, truncate, ...rest
    }: ITagProps, ref) => {
          const clickTag = (e) => {
            if (!disabled && onClick) {
              onClick(e);
            }
            e.preventDefault();
            e.stopPropagation();
          };

          const toggleTag = (e) => {
            if (!disabled && onChange) {
              e.preventDefault();
              e.stopPropagation();
              onChange(e);
            }
          };

          const tagRound = round;
          const canFocus = focusable && !disabled && !!(onClick || onChange);
          return (
            <Keyboard
              onEnter={clickTag}
              onSpace={toggleTag}
            >
              <ThemeContext.Consumer>
                {(theme) => {
                  let closeIcon;
                  if (icon || onChange) {
                    closeIcon = (
                      <StyledIcon theme={theme} disabled={disabled} onClick={onChange}>
                        {icon || <FormClose theme={theme} />}
                      </StyledIcon>
            );
                  }
                  return (
                    <StyledTag
                      ref={ref as React.RefObject<HTMLDivElement>}
                      direction={reverse ? 'row-reverse' : 'row'}
                      justify='between'
                      align='center'
                      a11yTitle={a11yTitle}
                      round={tagRound}
                      onClick={onClick && clickTag}
                      role='checkbox'
                      aria-checked={true}
                      tabIndex={canFocus ? 0 : undefined}
                      background={background}
                      disabled={disabled}
                      theme={theme}
                      {...rest}
                    >
                      {reverse && closeIcon}
                      {React.isValidElement(label) ? label : (
                        <Text
                          color={color}
                          size={size}
                          truncate={truncate}
                        >
                          {label && label.toString()}
                        </Text>
              )}
                      {!reverse && closeIcon}
                    </StyledTag>
                  );
                }}
              </ThemeContext.Consumer>
            </Keyboard>
          );
        }
);

Tag.defaultProps = {
  label: 'Text',
  pad: { horizontal: 'xsmall' },
  focusable: true,
};

export { Tag }
