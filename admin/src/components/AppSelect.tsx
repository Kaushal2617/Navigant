import { FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent } from '@mui/material';

interface Option {
    label: string;
    value: string;
}

interface AppSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    label?: string;
    size?: 'small' | 'medium';
    fullWidth?: boolean;
    disabled?: boolean;
}

export default function AppSelect({
    value,
    onChange,
    options,
    label,
    size = 'medium',
    fullWidth = false,
    disabled = false
}: AppSelectProps) {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value);
    };

    return (
        <FormControl size={size} fullWidth={fullWidth} variant="outlined">
            {label && <InputLabel>{label}</InputLabel>}
            <Select
                value={value}
                label={label}
                onChange={handleChange}
                disabled={disabled}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
