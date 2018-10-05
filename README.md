_PLEASE NOTE_ this has not reached a minimal release

# tracktastic

Tracktastic is a minimal-dependency tool that helps you track numeric values that change over time.

Values could be performance benchmarks or build sizes or anything really. Generating the values is not the point. Tracktastic ingests these values into a log file and then provides ways to update, clean, and view data from that log file as markdown files. That way you can commit the changes as you go (maybe on prepush ?) without needing to integrate with any apis.

### dependencies

|Package|What|Why
|:----|:---|:---|
|[`text-table`](https://www.npmjs.com/package/text-table)| zero-dependency ascii tablualar data | used by the default reporter|
