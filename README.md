# tracktastic

Tracktastic is a minimal-dependency tool that helps you track numeric values that change over time The values could be performance benchmarks or build sizes or anything really. Generating the values is not the point. Tracktastic ingests these values into a log file and then provides a way to update, clean, and view data from that log file as markdown files. That way you can commit the changes as you go (maybe on prepush ?) without needing to integrate with any apis.
