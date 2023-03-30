import * as yup from 'yup';

export const eventSchema = yup.object({
  body: yup.array().of(
    yup.object({
      user: yup.string().required(),
      eventType: yup.string().required()
    })
  )
});

// (async () => {
//   const valid = await eventSchema.validate({ a: 1 });
//   console.log({ valid });
// })();