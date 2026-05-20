import os
import glob

components_dir = r'c:\Users\aarus\edpear\src\components'
files = glob.glob(os.path.join(components_dir, '**', '*.tsx'), recursive=True)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.95fr)]' in content:
        content = content.replace(
            '<div className="flex gap-3">',
            '<div className="flex flex-1 gap-3 min-w-0">'
        )
        content = content.replace(
            '<div className="space-y-1">',
            '<div className="space-y-1 min-w-0 flex-1">'
        )
        content = content.replace(
            '<p className="text-sm font-semibold">',
            '<p className="text-sm font-semibold break-words">'
        )
        content = content.replace(
            '<p className="mt-1 text-sm font-semibold">',
            '<p className="mt-1 text-sm font-semibold break-words">'
        )
        content = content.replace(
            '<p className="text-sm text-muted-foreground">',
            '<p className="text-sm text-muted-foreground break-words">'
        )
        content = content.replace(
            '<p className="mt-1 text-sm text-muted-foreground">',
            '<p className="mt-1 text-sm text-muted-foreground break-words">'
        )
        content = content.replace(
            '<aside className="rounded-2xl border border-border bg-muted/10 p-4 sm:p-5">',
            '<aside className="rounded-2xl border border-border bg-muted/10 p-4 sm:p-5 min-w-0">'
        )
        content = content.replace(
            '<div className="grid gap-6 p-5 sm:p-6 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.95fr)]">',
            '<div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.95fr)]">'
        )
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
