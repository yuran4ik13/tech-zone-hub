export default function resolveStaticUrl(path: string): string {
  return process.env.NEXT_PUBLIC_API_URL + "/static" + path;
}
