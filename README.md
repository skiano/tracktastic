# tracktastic

Tracktastic is a minimal-dependency tool that helps you track numeric values that change over time inside a folder in your repository. The values could be performance stats or build sizes or anything really. Generating the values is not the point. Tracktastic ingests the values into a log value and then provides a way to update, clean, and view data from that log file as markdown files. That way you can commit the changes as you go (prepush ?) without needing to integrate with any apis.
