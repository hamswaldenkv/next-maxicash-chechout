export async function Await<T>({
  promise,
  children,
}: {
  promise: Promise<T>;
  children: (result: T) => JSX.Element;
}) {
  let result = await promise;

  return children(result);
}

export function moneyFormat(
  number: number,
  currency: string,
  lang: string = "en-US"
) {
  return new Intl.NumberFormat(lang, { style: "currency", currency }).format(
    number
  );
}

export function redirectByPost(
  url: string,
  parameters: Record<string, any>,
  inNewTab = false
) {
  parameters = parameters || {};
  inNewTab = inNewTab === undefined ? true : inNewTab;

  var form = document.createElement("form");
  form.id = "redirect-form";
  form.name = "redirect-form";
  form.action = url;
  form.method = "post";
  form.enctype = "application/x-www-form-urlencoded";

  if (inNewTab) form.target = "_blank";

  Object.keys(parameters).forEach(function (key) {
    var input = document.createElement("input");
    input.type = "text";
    input.name = key;
    input.value = parameters[key];
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);

  return false;
}
