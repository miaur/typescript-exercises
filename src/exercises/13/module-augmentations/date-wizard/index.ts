// This enables module augmentation mode.
import 'date-wizard';

declare module 'date-wizard' {
    interface DateDetails {
        year: number;
        month: number;
        date: number;
    }

    const pad: (s: number) => string;
}
