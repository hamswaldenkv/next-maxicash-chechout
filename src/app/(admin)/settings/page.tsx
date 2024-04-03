type Props = {
  params: {
    paramName: string;
  };
};

export default function Page({ params }: Props) {
  const { paramName } = params;
  return (
    <div>
      <h1>Page</h1>
    </div>
  );
}
