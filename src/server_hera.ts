import app from "./app_hera";

app.listen(process.env.PORT, () => {
  console.log(`API rodando na porta http://localhost:${process.env.PORT}`);
});
