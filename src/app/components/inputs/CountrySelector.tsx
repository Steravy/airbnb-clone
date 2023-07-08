'use Client';

import useCountries from "@/app/hooks/useCountries";
import { Fragment } from "react";
import Select from "react-select";

export type CountrySelectorValue = {
    value: string;
    label: string;
    flag: string;
    latlng: number[];
    region: string;
}

interface CountrySelectorProps {
    value?: CountrySelectorValue;
    onChange: (value: CountrySelectorValue) => void;
}


const CountrySelector: React.FC<CountrySelectorProps> = ({ value, onChange }) => {
    const { getAll } = useCountries();
    return (
        <Fragment>
            <Select
                placeholder='Start typing...'
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as CountrySelectorValue)}
                formatOptionLabel={(option: any) => (
                    <article className="flex flex-row intems-center gap-3" >
                        <article>{option.flag}</article>
                        <p>
                            {option.label}, <span className="text-neutral-500 ml-1" >{option.region}</span>
                        </p>
                    </article>
                )}
                classNames={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg'
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6'
                    }
                })}
            />
        </Fragment>
    )
}

export default CountrySelector;