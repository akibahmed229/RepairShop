"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { InputWithLabel } from "@/components/inputs/inputWithLabel";
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel";
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel";

import { StatesArray } from "@/lib/constants/StatesArray";

import {
  insertCustomerSchema,
  type insertCustomerSchemaType,
  type selectCustomerSchemaType,
} from "@/lib/zod-schemas/customer";

type Props = {
  customer?: selectCustomerSchemaType;
};

export default function CustomerForm({ customer }: Props) {
  const defaultValues: insertCustomerSchemaType = {
    id: customer?.id ?? 0,
    firstName: customer?.firstName ?? "",
    lastName: customer?.lastName ?? "",
    address1: customer?.address1 ?? "",
    address2: customer?.address2 ?? "",
    city: customer?.city ?? "",
    state: customer?.state ?? "",
    zip: customer?.zip ?? "",
    phone: customer?.phone ?? "",
    email: customer?.email ?? "",
    notes: customer?.notes ?? "",
  };

  const form = useForm<insertCustomerSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  });

  async function submitForm(data: insertCustomerSchemaType) {
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-4 sm:px-8">
      <div className="flex mx-auto">
        <h2 className="text-2xl font-bold mt-4">
          {customer?.id ? "Edit" : "New"} Customer Form
        </h2>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col md:flex-row gap-4 md:gap-8"
        >
          <div className="flex justify-center items-center mx-auto w-full gap-10 m-4">
            <div className="flex flex-col gap-4 w-full max-w-xs">
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="First Name"
                nameInSchema="firstName"
              />
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="Last Name"
                nameInSchema="lastName"
              />
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="Address 1"
                nameInSchema="address1"
              />
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="Address 2"
                nameInSchema="address2"
              />
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="City"
                nameInSchema="city"
              />
              <SelectWithLabel<insertCustomerSchemaType>
                fieldTitle="State"
                nameInSchema="state"
                data={StatesArray}
              />
            </div>

            <div className="flex flex-col gap-4 w-full max-w-xs m-4">
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="Zip"
                nameInSchema="zip"
              />
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="Phone"
                nameInSchema="phone"
              />
              <InputWithLabel<insertCustomerSchemaType>
                fieldTitle="Email"
                nameInSchema="email"
              />
              <TextAreaWithLabel<insertCustomerSchemaType>
                fieldTitle="notes"
                nameInSchema="notes"
                className="h-40"
              />

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="w-3/4"
                  variant="default"
                  title="Save"
                >
                  Save
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  title="Reset"
                  onClick={() => form.reset(defaultValues)}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
