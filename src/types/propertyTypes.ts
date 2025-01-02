// Update the existing file by adding CollapseProperties and removing AccordionProperties

// Add this to the existing property schemas
export const CollapseProperties = {
  display: z.object({
    ...baseDisplayProperties,
    collapseTitle: z.string().optional(),
    initiallyExpanded: z.boolean().optional(),
    showBorder: z.boolean().optional(),
  }),
  data: z.object({
    ...baseDataProperties,
  }),
  logic: z.object({
    ...baseLogicProperties,
    calculateValue: z.string().optional(),
  }),
};

// Replace AccordionPropertiesType with CollapsePropertiesType in the exports
export type CollapsePropertiesType = z.infer<typeof CollapseProperties.display> &
  z.infer<typeof CollapseProperties.data> &
  z.infer<typeof CollapseProperties.logic>;

// Update ComponentProperties type
export type ComponentProperties = {
  text: TextFieldPropertiesType;
  checkbox: CheckboxPropertiesType;
  radio: RadioPropertiesType;
  select: SelectPropertiesType;
  button: ButtonPropertiesType;
  datetime: DateTimePropertiesType;
  fileupload: FileUploadPropertiesType;
  signature: SignaturePropertiesType;
  otp: OTPPropertiesType;
  tags: TagsPropertiesType;
  container: ContainerPropertiesType;
  table: TablePropertiesType;
  tabs: TabsPropertiesType;
  collapse: CollapsePropertiesType;
};
