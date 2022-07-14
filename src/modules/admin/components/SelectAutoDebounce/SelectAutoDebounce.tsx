import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
interface Props {
  value: string;
  changeData: Function;
  error?: string;
  options: {
    id: string | number;
    name: string;
    [key: string]: any;
  }[];
  key_name: string;
}

const SelectAutoSuggetForm = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [listValueSugget, setlistValueSugget] = useState<
    {
      id: string | number;
      [key: string]: any;
      name: string;
    }[]
  >([]);
  const [valueName, setValueName] = useState<string>('');
  const findNameByValue = useCallback(
    (value: string, options: { id: string | number; name: string; [key: string]: any }[]): string => {
      if (value !== '') {
        const i = options.findIndex((option) => {
          if (option.id.toString() == value) {
            return option;
          }
        });
        if (i >= 0) {
          return options[i].name;
        } else {
          return '';
        }
      } else {
        return valueName;
      }
    },
    [],
  );
  useEffect(() => {
    setValueName(findNameByValue(props.value, props.options));
  }, [props.value, props.options]);
  const handleSuggetValue = (e: string) => {
    if (e.length >= 0) {
      const xx = props.options.filter((a, i) => {
        if (a.name.includes(e)) {
          return a;
        }
      });
      setlistValueSugget(xx);
    } else {
      setlistValueSugget([]);
    }
  };

  return (
    <>
      <div className="select-form">
        <div className="select-form-value">
          <input
            onChange={(e) => {
              setValueName(e.target.value);

              setOpen(true);
              handleSuggetValue(e.target.value);
            }}
            value={valueName}
            className="select-form-input search-sugget"
            type="text"
          />
          <i
            onClick={() => {
              setOpen(!open);
            }}
            className={open ? 'bx bx-chevron-down list-open' : 'bx bx-chevron-down'}
          ></i>
        </div>
        {open ? (
          <>
            {' '}
            <div className="select-form-list-options">
              <>
                {valueName !== '' ? (
                  <>
                    {listValueSugget.length > 0 ? (
                      <>
                        {listValueSugget.map((a, i) => {
                          return (
                            <div
                              onClick={() => {
                                setOpen(false);
                                if (props.value !== a.id) {
                                  const ob: { [key: string]: any } = {};
                                  ob[props.key_name] = a.id;
                                  props.changeData(ob);
                                }
                              }}
                              key={i}
                              className="select-form-option"
                            >
                              <p className="select-form-option-value">{a.name}</p>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        <div className="select-form-option">
                          <p>No option</p>
                        </div>
                      </>
                    )}
                  </>
                ) : null}
              </>
            </div>
            <div
              onClick={() => {
                setOpen(false);
              }}
              className="select-form-options-background"
            ></div>
          </>
        ) : null}
      </div>
      {props.error && valueName == '' ? (
        <div className="select-form-error-message">
          <span className="error-message">
            {' '}
            <FormattedMessage id={props.error} />{' '}
          </span>
        </div>
      ) : null}
    </>
  );
};

export default SelectAutoSuggetForm;
