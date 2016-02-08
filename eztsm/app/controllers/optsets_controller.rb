class OptsetsController < ApplicationController
  def index
    columns = [ 'optionset_name']
    select = tsmdb_select(columns, 'cloptsets')

    result_csv = CSV.new(columns.join(',') + "\n" + select['output'], :headers => true, :header_converters => :symbol, :converters => :all)
    result_json = Hash.new
    result_json['optsets'] = result_csv.to_a.map {|row| row.to_hash }
    result_json['exit_status'] = select['exit_status']

    respond_to do |format|
     format.json { render json: result_json.to_json }
    end

  end

end
