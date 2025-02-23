"use client";
import React from "react";
import { City } from "country-state-city";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// City Select Component
const CitySelect = ({
  selectedState,
  selectedCountry,
  selectedCity,
  setSelectedCity,
}: {
  selectedState: string | undefined;
  selectedCountry: string | undefined;
  selectedCity: string | undefined;
  setSelectedCity: (value: string | undefined) => void;
}) => {
  const [open, setOpen] = React.useState(false);

  const cities =
    selectedState && selectedCountry
      ? City.getCitiesOfState(selectedCountry, selectedState).map((city) => ({
          value: city.name,
          label: city.name,
        }))
      : [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-full">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={!selectedState}
        >
          {selectedCity ? selectedCity : "Select city..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search city..."
            disabled={!selectedState}
          />
          <CommandList>
            <CommandEmpty>No city found.</CommandEmpty>
            <CommandGroup>
              {cities.map((city) => (
                <CommandItem
                  key={city.value}
                  value={city.value}
                  onSelect={(currentValue) => {
                    setSelectedCity(
                      currentValue === selectedCity ? undefined : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCity === city.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {city.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CitySelect;
