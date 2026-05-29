# Birthday goal photos

Organize by age:

```
img/goals/33/run-half.jpg
```

Then in `_data/birthday_goals.yml`:

```yaml
image: /img/goals/33/run-half.jpg
```

Add check-ins under `updates:` (newest first). After adding or removing goals, run:

```bash
ruby scripts/generate_goal_pages.rb
```

Recommended: landscape or square, at least 800px wide, JPG or PNG.
